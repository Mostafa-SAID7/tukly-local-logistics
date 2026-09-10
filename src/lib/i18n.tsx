import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { APP_DICT } from "@/lib/i18n-app-dict";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

const DICT: Dict = {
  brand: { ar: "توكلي", en: "TUKLY" },
  tagline: { ar: "من محلك لباب العميل... التوك توك يوصّلها.", en: "From your store to their door — delivered by TukTok." },
  demoBadge: { ar: "بيانات تجريبية", en: "Demo data" },
  demoNote: { ar: "كل الأرقام والمواقع في هذه النسخة تجريبية للعرض فقط.", en: "All figures and locations here are simulated for demo purposes." },

  navHome: { ar: "الرئيسية", en: "Home" },
  navHow: { ar: "كيف يعمل", en: "How it works" },
  navMerchants: { ar: "للتجار", en: "For merchants" },
  navCaptains: { ar: "للكباتن", en: "For captains" },
  navZones: { ar: "المناطق", en: "Zones" },
  navFaq: { ar: "الأسئلة الشائعة", en: "FAQ" },
  navLogin: { ar: "تسجيل الدخول", en: "Sign in" },
  navSupport: { ar: "الدعم", en: "Support" },

  dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  deliveries: { ar: "التوصيلات", en: "Deliveries" },
  orders: { ar: "الطلبات", en: "Orders" },
  newDelivery: { ar: "توصيل جديد", en: "New delivery" },
  tracking: { ar: "التتبع", en: "Tracking" },
  earnings: { ar: "الأرباح", en: "Earnings" },
  captains: { ar: "الكباتن", en: "Captains" },
  merchants: { ar: "التجار", en: "Merchants" },
  customers: { ar: "العملاء", en: "Customers" },
  zones: { ar: "المناطق", en: "Zones" },
  pricing: { ar: "التسعير", en: "Pricing" },
  analytics: { ar: "التحليلات", en: "Analytics" },
  notifications: { ar: "الإشعارات", en: "Notifications" },
  auditLogs: { ar: "سجل العمليات", en: "Audit logs" },
  settings: { ar: "الإعدادات", en: "Settings" },
  overview: { ar: "نظرة عامة", en: "Overview" },
  liveMap: { ar: "الخريطة الحية", en: "Live map" },
  profile: { ar: "حسابي", en: "Account" },
  support: { ar: "الدعم", en: "Support" },

  logout: { ar: "تسجيل الخروج", en: "Sign out" },
  language: { ar: "اللغة", en: "Language" },
  theme: { ar: "المظهر", en: "Theme" },
  light: { ar: "فاتح", en: "Light" },
  dark: { ar: "داكن", en: "Dark" },
  system: { ar: "النظام", en: "System" },

  heroTitle: { ar: "كل طلباتك... توصّلها توكلي.", en: "Every order you send — TUKLY delivers it." },
  heroSub: {
    ar: "من المحل لباب العميل، توصيل محلي أسرع وأسهل باستخدام شبكة كباتن توك توك.",
    en: "From the store to the customer's door — faster local delivery through a TukTok captain network.",
  },
  ctaMerchant: { ar: "ابدأ كتاجر", en: "Start as a merchant" },
  ctaCaptain: { ar: "انضم ككابتن", en: "Join as a captain" },
  ctaTrack: { ar: "تتبع طلب تجريبي", en: "Track a demo order" },
  forMerchantsCopy: { ar: "خلي التوصيل علينا، وركز في شغلك.", en: "Leave delivery to us and focus on your business." },
  forCaptainsCopy: { ar: "خلي التوصيلات توصلك بدل ما تدور على الشغل.", en: "Let deliveries come to you instead of chasing work." },
  forCustomersCopy: { ar: "طلبك في الطريق... وتقدر تتابعه لحظة بلحظة.", en: "Your order is on the way — follow it step by step." },
  howItWorks: { ar: "إزاي بيشتغل", en: "How it works" },
  whyTuktok: { ar: "ليه التوك توك؟", en: "Why TukTok delivery" },
  statistics: { ar: "أرقام المنصة", en: "Platform numbers" },
  faq: { ar: "الأسئلة الشائعة", en: "Frequently asked questions" },

  todayOrders: { ar: "طلبات اليوم", en: "Today's orders" },
  pendingDeliveries: { ar: "طلبات معلّقة", en: "Pending deliveries" },
  activeDeliveries: { ar: "توصيلات جارية", en: "Active deliveries" },
  completedDeliveries: { ar: "تم تسليمها", en: "Completed" },
  failedDeliveries: { ar: "فشلت", en: "Failed" },
  cancelledDeliveries: { ar: "ملغاة", en: "Cancelled" },
  totalCost: { ar: "إجمالي تكلفة التوصيل", en: "Total delivery cost" },
  avgDeliveryTime: { ar: "متوسط زمن التوصيل", en: "Avg. delivery time" },
  successRate: { ar: "نسبة النجاح", en: "Success rate" },
  revenue: { ar: "الإيرادات", en: "Revenue" },
  commission: { ar: "عمولة المنصة", en: "Platform commission" },
  onlineCaptains: { ar: "كباتن متصلون", en: "Online captains" },
  activeMerchants: { ar: "تجار نشطون", en: "Active merchants" },
  totalDeliveries: { ar: "إجمالي التوصيلات", en: "Total deliveries" },
  deliveredToday: { ar: "تم تسليمه اليوم", en: "Delivered today" },

  stepPickup: { ar: "الاستلام", en: "Pickup" },
  stepDestination: { ar: "التسليم", en: "Destination" },
  stepPackage: { ar: "الشحنة", en: "Package" },
  stepOptions: { ar: "خيارات التوصيل", en: "Delivery options" },
  stepPrice: { ar: "السعر", en: "Price" },
  stepConfirm: { ar: "تأكيد", en: "Confirmation" },
  next: { ar: "التالي", en: "Next" },
  back: { ar: "السابق", en: "Back" },
  confirmDelivery: { ar: "تأكيد التوصيل", en: "Confirm delivery" },

  customerName: { ar: "اسم العميل", en: "Customer name" },
  customerPhone: { ar: "رقم العميل", en: "Customer phone" },
  governorate: { ar: "المحافظة", en: "Governorate" },
  city: { ar: "المدينة", en: "City" },
  area: { ar: "المنطقة", en: "Area" },
  street: { ar: "الشارع", en: "Street" },
  building: { ar: "العمارة", en: "Building" },
  floor: { ar: "الدور", en: "Floor" },
  apartment: { ar: "الشقة", en: "Apartment" },
  landmark: { ar: "علامة مميزة", en: "Landmark" },
  addressNotes: { ar: "تعليمات إضافية", en: "Additional instructions" },
  zone: { ar: "منطقة الخدمة", en: "Service zone" },
  packageType: { ar: "نوع الشحنة", en: "Package type" },
  packageSize: { ar: "حجم الشحنة", en: "Package size" },
  packageWeight: { ar: "الوزن (كجم)", en: "Weight (kg)" },
  packageDescription: { ar: "وصف الشحنة", en: "Package description" },
  instructions: { ar: "تعليمات خاصة", en: "Special instructions" },
  codRequired: { ar: "تحصيل نقدي مطلوب", en: "Cash collection required" },
  codAmount: { ar: "مبلغ التحصيل", en: "COD amount" },
  priority: { ar: "أولوية التوصيل", en: "Delivery priority" },
  distance: { ar: "المسافة", en: "Distance" },
  eta: { ar: "الزمن المتوقع", en: "Estimated time" },
  deliveryFee: { ar: "أجرة التوصيل", en: "Delivery fee" },
  captainEarning: { ar: "نصيب الكابتن", en: "Captain earning" },

  small: { ar: "صغير", en: "Small" },
  medium: { ar: "متوسط", en: "Medium" },
  large: { ar: "كبير", en: "Large" },
  standard: { ar: "عادي", en: "Standard" },
  express: { ar: "سريع", en: "Express" },

  search: { ar: "بحث", en: "Search" },
  filter: { ar: "تصفية", en: "Filter" },
  all: { ar: "الكل", en: "All" },
  status: { ar: "الحالة", en: "Status" },
  price: { ar: "السعر", en: "Price" },
  created: { ar: "تاريخ الإنشاء", en: "Created" },
  updated: { ar: "آخر تحديث", en: "Updated" },
  actions: { ar: "إجراءات", en: "Actions" },
  details: { ar: "التفاصيل", en: "Details" },
  view: { ar: "عرض", en: "View" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  approve: { ar: "اعتماد", en: "Approve" },
  suspend: { ar: "إيقاف", en: "Suspend" },
  save: { ar: "حفظ", en: "Save" },
  retry: { ar: "حاول مرة أخرى", en: "Try again" },
  timeline: { ar: "المسار الزمني", en: "Timeline" },
  summary: { ar: "الملخص", en: "Summary" },
  financial: { ar: "التسوية المالية", en: "Financial" },
  vehicle: { ar: "المركبة", en: "Vehicle" },
  rating: { ar: "التقييم", en: "Rating" },
  accept: { ar: "قبول", en: "Accept" },
  reject: { ar: "رفض", en: "Reject" },
  call: { ar: "اتصال", en: "Call" },
  navigate: { ar: "الاتجاهات", en: "Navigate" },
  online: { ar: "متصل", en: "Online" },
  offline: { ar: "غير متصل", en: "Offline" },
  available: { ar: "متاح", en: "Available" },
  busy: { ar: "مشغول", en: "Busy" },
  markArrived: { ar: "وصلت", en: "Mark arrived" },
  confirmPickup: { ar: "تأكيد الاستلام", en: "Confirm pickup" },
  confirmDelivered: { ar: "تأكيد التسليم", en: "Confirm delivered" },
  startTrip: { ar: "ابدأ التحرك", en: "Start trip" },
  availableRequests: { ar: "طلبات متاحة", en: "Available requests" },
  activeDelivery: { ar: "التوصيلة الحالية", en: "Active delivery" },
  acceptanceRate: { ar: "نسبة القبول", en: "Acceptance rate" },
  todayEarnings: { ar: "أرباح اليوم", en: "Today's earnings" },
  thisWeek: { ar: "هذا الأسبوع", en: "This week" },
  thisMonth: { ar: "هذا الشهر", en: "This month" },
  netEarnings: { ar: "الصافي", en: "Net earnings" },
  bonuses: { ar: "مكافآت", en: "Bonuses" },
  penalties: { ar: "خصومات", en: "Penalties" },
  platformFees: { ar: "عمولة المنصة", en: "Platform fees" },

  emptyDeliveriesTitle: { ar: "مفيش توصيلات لسه", en: "No deliveries yet" },
  emptyDeliveriesBody: {
    ar: "لما تنشئ أول طلب توصيل، هتظهر تفاصيله هنا.",
    en: "Create your first delivery request and it will show up here.",
  },
  emptyCaptains: { ar: "لا يوجد كباتن متاحين حالياً", en: "No captains available right now" },
  emptyRequests: { ar: "مفيش طلبات متاحة في منطقتك دلوقتي", en: "No available requests in your zone right now" },
  loadError: { ar: "حدث خطأ أثناء تحميل الطلبات. حاول مرة أخرى.", en: "Something went wrong loading orders. Please try again." },

  errRequired: { ar: "من فضلك املأ هذا الحقل.", en: "This field is required." },
  errPickup: { ar: "من فضلك أدخل عنوان الاستلام.", en: "Please enter the pickup address." },
  errPhone: { ar: "رقم الموبايل غير صحيح (11 رقم يبدأ بـ 01).", en: "Invalid phone number (11 digits starting with 01)." },
  errWeight: { ar: "الوزن يتعدى الحد المسموح للتوك توك في هذه المنطقة.", en: "Weight exceeds the TukTok limit for this zone." },
  errZone: { ar: "المنطقة غير مفعّلة للخدمة حالياً.", en: "This zone is not active for service right now." },
  errCod: { ar: "مبلغ التحصيل لا يمكن أن يكون سالباً.", en: "COD amount cannot be negative." },

  egp: { ar: "جنيه", en: "EGP" },
  min: { ar: "دقيقة", en: "min" },
  km: { ar: "كم", en: "km" },
  trackingTitle: { ar: "طلبك في الطريق", en: "Your delivery is on the way" },
  orderId: { ar: "رقم الطلب", en: "Order ID" },
  mapDemoNote: { ar: "خريطة تجريبية — حركة الكابتن محاكاة وليست GPS حقيقي.", en: "Demo map — captain movement is simulated, not real GPS." },
};

const STATUS_LABELS: Record<string, { ar: string; en: string }> = {
  DRAFT: { ar: "مسودة", en: "Draft" },
  PENDING: { ar: "في الانتظار", en: "Pending" },
  SEARCHING_CAPTAIN: { ar: "بندور على كابتن", en: "Searching captain" },
  ASSIGNED: { ar: "تم تعيين كابتن", en: "Assigned" },
  CAPTAIN_EN_ROUTE_TO_PICKUP: { ar: "الكابتن في الطريق للاستلام", en: "Captain en route to pickup" },
  ARRIVED_AT_PICKUP: { ar: "وصل مكان الاستلام", en: "Arrived at pickup" },
  PICKED_UP: { ar: "استلم الشحنة", en: "Picked up" },
  IN_TRANSIT: { ar: "في الطريق للعميل", en: "In transit" },
  ARRIVED_AT_DESTINATION: { ar: "وصل للعميل", en: "Arrived at destination" },
  DELIVERED: { ar: "تم التسليم", en: "Delivered" },
  FAILED: { ar: "فشل التسليم", en: "Failed" },
  CANCELLED: { ar: "ملغي", en: "Cancelled" },
  EXPIRED: { ar: "منتهي", en: "Expired" },
  FOOD: { ar: "طعام", en: "Food" },
  GROCERY: { ar: "بقالة", en: "Grocery" },
  CLOTHING: { ar: "ملابس", en: "Clothing" },
  ELECTRONICS: { ar: "إلكترونيات", en: "Electronics" },
  DOCUMENTS: { ar: "مستندات", en: "Documents" },
  PHARMACY: { ar: "صيدلية", en: "Pharmacy" },
  SMALL_PARCEL: { ar: "شحنة صغيرة", en: "Small parcel" },
  OTHER: { ar: "أخرى", en: "Other" },
  APPROVED: { ar: "معتمد", en: "Approved" },
  SUSPENDED: { ar: "موقوف", en: "Suspended" },
  ACTIVE: { ar: "مفعّلة", en: "Active" },
  PAUSED: { ar: "متوقفة", en: "Paused" },
  MAINTENANCE: { ar: "في الصيانة", en: "Maintenance" },
  OPEN: { ar: "مفتوحة", en: "Open" },
  IN_PROGRESS: { ar: "جاري العمل", en: "In progress" },
  WAITING_FOR_USER: { ar: "بانتظار ردك", en: "Waiting for you" },
  RESOLVED: { ar: "تم الحل", en: "Resolved" },
  CLOSED: { ar: "مغلقة", en: "Closed" },
  CUSTOMER: { ar: "عميل", en: "Customer" },
  MERCHANT: { ar: "تاجر", en: "Merchant" },
  CAPTAIN: { ar: "كابتن", en: "Captain" },
  ADMIN: { ar: "مدير", en: "Admin" },
  OPERATIONS: { ar: "تشغيل", en: "Operations" },
  SUPPORT: { ar: "دعم", en: "Support" },
  DELIVERY_PROBLEM: { ar: "مشكلة في التوصيل", en: "Delivery problem" },
  MISSING_PACKAGE: { ar: "شحنة مفقودة", en: "Missing package" },
  DAMAGED_PACKAGE: { ar: "شحنة تالفة", en: "Damaged package" },
  WRONG_ADDRESS: { ar: "عنوان خطأ", en: "Wrong address" },
  CAPTAIN_ISSUE: { ar: "مشكلة مع الكابتن", en: "Captain issue" },
  MERCHANT_ISSUE: { ar: "مشكلة مع التاجر", en: "Merchant issue" },
  PAYMENT_ISSUE: { ar: "مشكلة في الدفع", en: "Payment issue" },
  STANDARD: { ar: "عادي", en: "Standard" },
  EXPRESS: { ar: "سريع", en: "Express" },
  SMALL: { ar: "صغير", en: "Small" },
  MEDIUM: { ar: "متوسط", en: "Medium" },
  LARGE: { ar: "كبير", en: "Large" },
};

interface I18nValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: keyof typeof DICT | string) => string;
  label: (code: string) => string;
  money: (value: number) => string;
}

const I18nContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = "tukly.lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir,
      setLang,
      toggleLang: () => setLang(lang === "ar" ? "en" : "ar"),
      t: (key) => DICT[key as string]?.[lang] ?? APP_DICT[key as string]?.[lang] ?? String(key),
      label: (code) => STATUS_LABELS[code]?.[lang] ?? code,
      money: (v) =>
        `${new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US", { maximumFractionDigits: 1 }).format(v)} ${lang === "ar" ? "جنيه" : "EGP"}`,
    }),
    [lang, dir, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
