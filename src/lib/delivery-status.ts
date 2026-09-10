import type { DeliveryStatus } from "@/types/domain";

/** Strict delivery state machine. Only these transitions are allowed. */
export const ALLOWED_TRANSITIONS: Record<DeliveryStatus, DeliveryStatus[]> = {
  DRAFT: ["PENDING", "CANCELLED"],
  PENDING: ["SEARCHING_CAPTAIN", "CANCELLED", "EXPIRED"],
  SEARCHING_CAPTAIN: ["ASSIGNED", "CANCELLED", "EXPIRED"],
  ASSIGNED: ["CAPTAIN_EN_ROUTE_TO_PICKUP", "CANCELLED", "FAILED"],
  CAPTAIN_EN_ROUTE_TO_PICKUP: ["ARRIVED_AT_PICKUP", "CANCELLED", "FAILED"],
  ARRIVED_AT_PICKUP: ["PICKED_UP", "CANCELLED", "FAILED"],
  PICKED_UP: ["IN_TRANSIT", "FAILED"],
  IN_TRANSIT: ["ARRIVED_AT_DESTINATION", "FAILED"],
  ARRIVED_AT_DESTINATION: ["DELIVERED", "FAILED"],
  DELIVERED: [],
  FAILED: [],
  CANCELLED: [],
  EXPIRED: [],
};

export const TERMINAL_STATUSES: DeliveryStatus[] = ["DELIVERED", "FAILED", "CANCELLED", "EXPIRED"];

export function canTransition(from: DeliveryStatus, to: DeliveryStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function nextStatus(current: DeliveryStatus): DeliveryStatus | null {
  const happyPath = ALLOWED_TRANSITIONS[current].filter(
    (s) => !TERMINAL_STATUSES.includes(s) || s === "DELIVERED",
  );
  return happyPath[0] ?? null;
}

/** Ordered progress steps shown to customers. */
export const PROGRESS_STEPS: DeliveryStatus[] = [
  "PENDING",
  "SEARCHING_CAPTAIN",
  "ASSIGNED",
  "CAPTAIN_EN_ROUTE_TO_PICKUP",
  "ARRIVED_AT_PICKUP",
  "PICKED_UP",
  "IN_TRANSIT",
  "ARRIVED_AT_DESTINATION",
  "DELIVERED",
];

export type StatusTone = "neutral" | "info" | "active" | "success" | "danger";

export function statusTone(status: DeliveryStatus): StatusTone {
  if (status === "DELIVERED") return "success";
  if (status === "FAILED" || status === "CANCELLED" || status === "EXPIRED") return "danger";
  if (status === "DRAFT" || status === "PENDING") return "neutral";
  if (status === "SEARCHING_CAPTAIN") return "info";
  return "active";
}
