import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  DEMO_CAPTAINS,
  DEMO_MERCHANTS,
  DEMO_ZONES,
  buildDemoAudit,
  buildDemoDeliveries,
  buildDemoNotifications,
  buildDemoTickets,
} from "@/data/demo";
import { canTransition, nextStatus } from "@/lib/delivery-status";
import { DEFAULT_PRICING, calculatePrice, estimateDistanceKm, estimateMinutes } from "@/lib/pricing";
import type {
  Address,
  AppNotification,
  AuditEntry,
  Captain,
  Delivery,
  DeliveryStatus,
  Merchant,
  PackageSize,
  PackageType,
  PricingConfig,
  Priority,
  ServiceZone,
  SupportTicket,
} from "@/types/domain";

export interface StoreState {
  deliveries: Delivery[];
  captains: Captain[];
  merchants: Merchant[];
  zones: ServiceZone[];
  pricing: PricingConfig;
  notifications: AppNotification[];
  tickets: SupportTicket[];
  audit: AuditEntry[];
}

export interface NewDeliveryInput {
  merchantId: string;
  customerName: string;
  customerPhone: string;
  pickup: Address;
  destination: Address;
  zoneId: string;
  packageType: PackageType;
  packageSize: PackageSize;
  packageWeightKg: number;
  description: string;
  instructions?: string;
  codAmount: number;
  priority: Priority;
}

interface StoreActions {
  createDelivery: (input: NewDeliveryInput, actor: string) => Delivery;
  transition: (id: string, to: DeliveryStatus, actor: string) => boolean;
  advance: (id: string, actor: string) => boolean;
  assignCaptain: (id: string, captainId: string, actor: string) => void;
  autoAssign: (id: string, actor: string) => Captain | null;
  rateDelivery: (id: string, rating: number) => void;
  setCaptainAvailability: (captainId: string, availability: Captain["availability"]) => void;
  setCaptainStatus: (captainId: string, status: Captain["status"], actor: string) => void;
  setMerchantStatus: (merchantId: string, status: Merchant["status"], actor: string) => void;
  updateZone: (zoneId: string, patch: Partial<ServiceZone>, actor: string) => void;
  updatePricing: (patch: Partial<PricingConfig>, actor: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  createTicket: (ticket: Pick<SupportTicket, "category" | "subject"> & { body: string }) => SupportTicket;
  replyTicket: (id: string, body: string, from: "USER" | "SUPPORT") => void;
  setTicketStatus: (id: string, status: SupportTicket["status"]) => void;
  reset: () => void;
}

interface StoreValue extends StoreState, StoreActions {
  hydrated: boolean;
  zoneById: (id: string) => ServiceZone | undefined;
  captainById: (id: string | null) => Captain | undefined;
  merchantById: (id: string) => Merchant | undefined;
  unreadCount: number;
}

const STORAGE_KEY = "tukly.store.v1";
const StoreContext = createContext<StoreValue | null>(null);

function buildInitial(): StoreState {
  return {
    deliveries: buildDemoDeliveries(),
    captains: DEMO_CAPTAINS.map((c) => ({ ...c })),
    merchants: DEMO_MERCHANTS.map((m) => ({ ...m })),
    zones: DEMO_ZONES.map((z) => ({ ...z })),
    pricing: { ...DEFAULT_PRICING },
    notifications: buildDemoNotifications(),
    tickets: buildDemoTickets(),
    audit: buildDemoAudit(),
  };
}

const nowIso = () => new Date().toISOString();
const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

const NOTIF_BY_STATUS: Partial<Record<DeliveryStatus, AppNotification["type"]>> = {
  ASSIGNED: "ASSIGNED",
  CAPTAIN_EN_ROUTE_TO_PICKUP: "ARRIVING",
  PICKED_UP: "PICKED_UP",
  ARRIVED_AT_DESTINATION: "APPROACHING",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  FAILED: "CANCELLED",
};

const NOTIF_TITLES: Record<AppNotification["type"], { ar: string; en: string }> = {
  ASSIGNED: { ar: "تم تعيين كابتن لطلبك", en: "A captain was assigned to your order" },
  ARRIVING: { ar: "الكابتن في الطريق للاستلام", en: "Captain is heading to pickup" },
  PICKED_UP: { ar: "الكابتن استلم الشحنة", en: "Captain picked up the package" },
  APPROACHING: { ar: "الكابتن وصل لعنوان العميل", en: "Captain arrived at the destination" },
  DELIVERED: { ar: "تم تسليم الطلب بنجاح", en: "Order delivered successfully" },
  CANCELLED: { ar: "لم يكتمل الطلب", en: "Order was not completed" },
  COD: { ar: "تم تحصيل المبلغ", en: "COD amount collected" },
  SYSTEM: { ar: "تنبيه من النظام", en: "System notice" },
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(() => buildInitial());
  const [hydrated, setHydrated] = useState(false);
  const skipSave = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoreState;
        if (parsed?.deliveries && parsed?.zones) setState(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* quota */
    }
  }, [state, hydrated]);

  const log = (s: StoreState, actor: string, action: string, entity: string): StoreState => ({
    ...s,
    audit: [{ id: uid("au"), actor, action, entity, at: nowIso() }, ...s.audit].slice(0, 200),
  });

  const notify = (s: StoreState, type: AppNotification["type"], deliveryId?: string): StoreState => ({
    ...s,
    notifications: [
      {
        id: uid("nt"),
        type,
        titleAr: NOTIF_TITLES[type].ar,
        titleEn: NOTIF_TITLES[type].en,
        ...(deliveryId ? { deliveryId } : {}),
        at: nowIso(),
        read: false,
      },
      ...s.notifications,
    ].slice(0, 100),
  });

  const applyTransition = (s: StoreState, id: string, to: DeliveryStatus, actor: string): StoreState => {
    const d = s.deliveries.find((x) => x.id === id);
    if (!d || !canTransition(d.status, to)) return s;
    const at = nowIso();
    let next: StoreState = {
      ...s,
      deliveries: s.deliveries.map((x) =>
        x.id === id
          ? { ...x, status: to, updatedAt: at, timeline: [...x.timeline, { status: to, at, actor }] }
          : x,
      ),
    };
    if (to === "DELIVERED" || to === "FAILED" || to === "CANCELLED") {
      next = {
        ...next,
        captains: next.captains.map((c) =>
          c.id === d.captainId && c.availability === "BUSY" ? { ...c, availability: "AVAILABLE" } : c,
        ),
      };
    }
    if (to === "DELIVERED") {
      next = {
        ...next,
        merchants: next.merchants.map((m) =>
          m.id === d.merchantId ? { ...m, totalDeliveries: m.totalDeliveries + 1 } : m,
        ),
        captains: next.captains.map((c) =>
          c.id === d.captainId ? { ...c, totalDeliveries: c.totalDeliveries + 1 } : c,
        ),
      };
      if (d.codAmount > 0) next = notify(next, "COD", id);
    }
    const nt = NOTIF_BY_STATUS[to];
    if (nt) next = notify(next, nt, id);
    return log(next, actor, `${id}: ${d.status} → ${to}`, "delivery");
  };

  const pickCaptain = (s: StoreState, d: Delivery): Captain | null => {
    const pool = s.captains.filter(
      (c) =>
        c.status === "APPROVED" &&
        c.availability === "AVAILABLE" &&
        c.vehicleStatus === "ACTIVE" &&
        c.zoneId === d.zoneId,
    );
    if (!pool.length) return null;
    return pool.sort(
      (a, b) =>
        estimateDistanceKm(a, d.pickup) - estimateDistanceKm(b, d.pickup) || b.rating - a.rating,
    )[0] ?? null;
  };

  const applyAssign = (s: StoreState, id: string, captainId: string, actor: string): StoreState => {
    const d = s.deliveries.find((x) => x.id === id);
    if (!d || !canTransition(d.status, "ASSIGNED")) return s;
    const withCaptain: StoreState = {
      ...s,
      deliveries: s.deliveries.map((x) => (x.id === id ? { ...x, captainId } : x)),
      captains: s.captains.map((c) => (c.id === captainId ? { ...c, availability: "BUSY" } : c)),
    };
    return applyTransition(withCaptain, id, "ASSIGNED", actor);
  };

  const createDelivery = useCallback<StoreActions["createDelivery"]>((input, actor) => {
    const zone = state.zones.find((z) => z.id === input.zoneId);
    const distanceKm = estimateDistanceKm(input.pickup, input.destination);
    const price = calculatePrice(
      { distanceKm, size: input.packageSize, priority: input.priority, ...(zone ? { zone } : {}) },
      state.pricing,
    );
    const at = nowIso();
    const seq = 129 + state.deliveries.length;
    const delivery: Delivery = {
      id: `TK-2026-${String(seq).padStart(5, "0")}`,
      merchantId: input.merchantId,
      captainId: null,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      pickup: input.pickup,
      destination: input.destination,
      zoneId: input.zoneId,
      packageType: input.packageType,
      packageSize: input.packageSize,
      packageWeightKg: input.packageWeightKg,
      description: input.description,
      ...(input.instructions ? { instructions: input.instructions } : {}),
      codAmount: input.codAmount,
      priority: input.priority,
      distanceKm,
      etaMinutes: estimateMinutes(distanceKm, input.priority),
      price,
      status: "PENDING",
      createdAt: at,
      updatedAt: at,
      timeline: [{ status: "PENDING", at, actor }],
    };
    setState((s) => {
      let next: StoreState = { ...s, deliveries: [delivery, ...s.deliveries] };
      next = log(next, actor, `إنشاء طلب ${delivery.id}`, "delivery");
      next = applyTransition(next, delivery.id, "SEARCHING_CAPTAIN", "system");
      return next;
    });
    return delivery;
  }, [state.zones, state.pricing, state.deliveries.length]);

  const transition = useCallback<StoreActions["transition"]>((id, to, actor) => {
    const d = state.deliveries.find((x) => x.id === id);
    if (!d || !canTransition(d.status, to)) return false;
    setState((s) => applyTransition(s, id, to, actor));
    return true;
  }, [state.deliveries]);

  const advance = useCallback<StoreActions["advance"]>((id, actor) => {
    const d = state.deliveries.find((x) => x.id === id);
    if (!d) return false;
    const to = nextStatus(d.status);
    if (!to) return false;
    if (to === "ASSIGNED") {
      const c = pickCaptain(state, d);
      if (!c) return false;
      setState((s) => applyAssign(s, id, c.id, actor));
      return true;
    }
    setState((s) => applyTransition(s, id, to, actor));
    return true;
  }, [state]);

  const assignCaptain = useCallback<StoreActions["assignCaptain"]>((id, captainId, actor) => {
    setState((s) => applyAssign(s, id, captainId, actor));
  }, []);

  const autoAssign = useCallback<StoreActions["autoAssign"]>((id, actor) => {
    const d = state.deliveries.find((x) => x.id === id);
    if (!d) return null;
    const c = pickCaptain(state, d);
    if (!c) return null;
    setState((s) => applyAssign(s, id, c.id, actor));
    return c;
  }, [state]);

  const rateDelivery = useCallback<StoreActions["rateDelivery"]>((id, rating) => {
    setState((s) => ({
      ...s,
      deliveries: s.deliveries.map((d) => (d.id === id ? { ...d, rating } : d)),
    }));
  }, []);

  const setCaptainAvailability = useCallback<StoreActions["setCaptainAvailability"]>((captainId, availability) => {
    setState((s) => ({
      ...s,
      captains: s.captains.map((c) => (c.id === captainId ? { ...c, availability } : c)),
    }));
  }, []);

  const setCaptainStatus = useCallback<StoreActions["setCaptainStatus"]>((captainId, status, actor) => {
    setState((s) => {
      const c = s.captains.find((x) => x.id === captainId);
      return log(
        { ...s, captains: s.captains.map((x) => (x.id === captainId ? { ...x, status } : x)) },
        actor,
        `${status}: ${c?.fullName ?? captainId}`,
        "captain",
      );
    });
  }, []);

  const setMerchantStatus = useCallback<StoreActions["setMerchantStatus"]>((merchantId, status, actor) => {
    setState((s) => {
      const m = s.merchants.find((x) => x.id === merchantId);
      return log(
        { ...s, merchants: s.merchants.map((x) => (x.id === merchantId ? { ...x, status } : x)) },
        actor,
        `${status}: ${m?.businessName ?? merchantId}`,
        "merchant",
      );
    });
  }, []);

  const updateZone = useCallback<StoreActions["updateZone"]>((zoneId, patch, actor) => {
    setState((s) => {
      const z = s.zones.find((x) => x.id === zoneId);
      return log(
        { ...s, zones: s.zones.map((x) => (x.id === zoneId ? { ...x, ...patch } : x)) },
        actor,
        `تحديث منطقة ${z?.nameAr ?? zoneId}: ${Object.keys(patch).join(", ")}`,
        "zone",
      );
    });
  }, []);

  const updatePricing = useCallback<StoreActions["updatePricing"]>((patch, actor) => {
    setState((s) =>
      log(
        { ...s, pricing: { ...s.pricing, ...patch } },
        actor,
        `تعديل قاعدة التسعير: ${Object.entries(patch)
          .map(([k, v]) => `${k}=${v}`)
          .join(", ")}`,
        "pricing",
      ),
    );
  }, []);

  const markRead = useCallback<StoreActions["markRead"]>((id) => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  }, []);

  const markAllRead = useCallback(() => {
    setState((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
  }, []);

  const createTicket = useCallback<StoreActions["createTicket"]>((input) => {
    const ticket: SupportTicket = {
      id: `SP-${1043 + Math.floor(Math.random() * 900)}`,
      category: input.category,
      subject: input.subject,
      status: "OPEN",
      createdAt: nowIso(),
      messages: [{ from: "USER", body: input.body, at: nowIso() }],
    };
    setState((s) => ({ ...s, tickets: [ticket, ...s.tickets] }));
    return ticket;
  }, []);

  const replyTicket = useCallback<StoreActions["replyTicket"]>((id, body, from) => {
    setState((s) => ({
      ...s,
      tickets: s.tickets.map((tk) =>
        tk.id === id
          ? {
              ...tk,
              status: from === "SUPPORT" ? "WAITING_FOR_USER" : "IN_PROGRESS",
              messages: [...tk.messages, { from, body, at: nowIso() }],
            }
          : tk,
      ),
    }));
  }, []);

  const setTicketStatus = useCallback<StoreActions["setTicketStatus"]>((id, status) => {
    setState((s) => ({ ...s, tickets: s.tickets.map((tk) => (tk.id === id ? { ...tk, status } : tk)) }));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(buildInitial());
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      hydrated,
      zoneById: (id) => state.zones.find((z) => z.id === id),
      captainById: (id) => (id ? state.captains.find((c) => c.id === id) : undefined),
      merchantById: (id) => state.merchants.find((m) => m.id === id),
      unreadCount: state.notifications.filter((n) => !n.read).length,
      createDelivery,
      transition,
      advance,
      assignCaptain,
      autoAssign,
      rateDelivery,
      setCaptainAvailability,
      setCaptainStatus,
      setMerchantStatus,
      updateZone,
      updatePricing,
      markRead,
      markAllRead,
      createTicket,
      replyTicket,
      setTicketStatus,
      reset,
    }),
    [
      state,
      hydrated,
      createDelivery,
      transition,
      advance,
      assignCaptain,
      autoAssign,
      rateDelivery,
      setCaptainAvailability,
      setCaptainStatus,
      setMerchantStatus,
      updateZone,
      updatePricing,
      markRead,
      markAllRead,
      createTicket,
      replyTicket,
      setTicketStatus,
      reset,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
