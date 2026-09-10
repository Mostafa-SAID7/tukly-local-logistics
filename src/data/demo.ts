import { calculatePrice, DEFAULT_PRICING, estimateDistanceKm, estimateMinutes } from "@/lib/pricing";
import type {
  Address,
  AppNotification,
  AuditEntry,
  Captain,
  Customer,
  Delivery,
  DeliveryStatus,
  Merchant,
  PackageType,
  ServiceZone,
  SupportTicket,
} from "@/types/domain";

export const DEMO_ZONES: ServiceZone[] = [
  {
    id: "zn-tanta",
    nameAr: "طنطا",
    nameEn: "Tanta",
    city: "الغربية",
    status: "ACTIVE",
    radiusKm: 9,
    baseFee: 25,
    perKmFee: 4,
    maxWeightKg: 30,
    maxDimensionCm: 80,
    hours: { from: "08:00", to: "23:30" },
  },
  {
    id: "zn-mahalla",
    nameAr: "المحلة الكبرى",
    nameEn: "El Mahalla El Kubra",
    city: "الغربية",
    status: "ACTIVE",
    radiusKm: 7,
    baseFee: 22,
    perKmFee: 4,
    maxWeightKg: 25,
    maxDimensionCm: 70,
    hours: { from: "09:00", to: "22:00" },
  },
  {
    id: "zn-mansoura",
    nameAr: "المنصورة",
    nameEn: "Mansoura",
    city: "الدقهلية",
    status: "ACTIVE",
    radiusKm: 10,
    baseFee: 26,
    perKmFee: 4.5,
    maxWeightKg: 30,
    maxDimensionCm: 80,
    hours: { from: "08:30", to: "23:00" },
  },
  {
    id: "zn-alex",
    nameAr: "الإسكندرية",
    nameEn: "Alexandria",
    city: "الإسكندرية",
    status: "PAUSED",
    radiusKm: 12,
    baseFee: 30,
    perKmFee: 5,
    maxWeightKg: 25,
    maxDimensionCm: 70,
    hours: { from: "09:00", to: "21:00" },
  },
  {
    id: "zn-giza",
    nameAr: "الجيزة",
    nameEn: "Giza",
    city: "الجيزة",
    status: "PAUSED",
    radiusKm: 11,
    baseFee: 32,
    perKmFee: 5,
    maxWeightKg: 25,
    maxDimensionCm: 70,
    hours: { from: "09:00", to: "22:00" },
  },
  {
    id: "zn-cairo",
    nameAr: "القاهرة",
    nameEn: "Cairo",
    city: "القاهرة",
    status: "PAUSED",
    radiusKm: 12,
    baseFee: 34,
    perKmFee: 5.5,
    maxWeightKg: 25,
    maxDimensionCm: 70,
    hours: { from: "09:00", to: "22:00" },
  },
];

export const DEMO_MERCHANTS: Merchant[] = [
  {
    id: "mr-rahma",
    businessName: "مخبز الرحمة",
    owner: "سيد عبد الغني",
    phone: "01011223344",
    email: "rahma.bakery@demo.tukly.eg",
    category: "مخبوزات",
    zoneId: "zn-tanta",
    address: "طنطا - شارع البحر - عمارة 12",
    branches: 2,
    status: "APPROVED",
    createdAt: "2025-11-04T09:00:00Z",
    totalDeliveries: 412,
  },
  {
    id: "mr-madina",
    businessName: "ماركت المدينة",
    owner: "هالة فتحي",
    phone: "01122334455",
    email: "madina.market@demo.tukly.eg",
    category: "بقالة",
    zoneId: "zn-tanta",
    address: "طنطا - منطقة الاستاد - شارع الجيش",
    branches: 1,
    status: "APPROVED",
    createdAt: "2025-12-18T11:20:00Z",
    totalDeliveries: 268,
  },
  {
    id: "mr-nour",
    businessName: "صيدلية النور",
    owner: "د. منى شريف",
    phone: "01233445566",
    email: "nour.pharmacy@demo.tukly.eg",
    category: "صيدلية (تحتاج موافقة تشغيلية)",
    zoneId: "zn-mahalla",
    address: "المحلة الكبرى - شارع الجلاء",
    branches: 1,
    status: "PENDING",
    createdAt: "2026-02-02T08:10:00Z",
    totalDeliveries: 34,
  },
  {
    id: "mr-beit",
    businessName: "مطعم بيت العيلة",
    owner: "كريم مصطفى",
    phone: "01099887766",
    email: "beit.elaila@demo.tukly.eg",
    category: "مطاعم",
    zoneId: "zn-mansoura",
    address: "المنصورة - شارع قناة السويس",
    branches: 3,
    status: "APPROVED",
    createdAt: "2025-09-27T15:00:00Z",
    totalDeliveries: 631,
  },
  {
    id: "mr-baraka",
    businessName: "محل البركة",
    owner: "عم رجب",
    phone: "01055667788",
    email: "baraka@demo.tukly.eg",
    category: "أدوات منزلية",
    zoneId: "zn-mahalla",
    address: "المحلة الكبرى - سوق الخضار",
    branches: 1,
    status: "SUSPENDED",
    createdAt: "2025-10-11T13:45:00Z",
    totalDeliveries: 97,
  },
  {
    id: "mr-halawany",
    businessName: "حلويات طنطا",
    owner: "أشرف زكي",
    phone: "01144556677",
    email: "tanta.sweets@demo.tukly.eg",
    category: "حلويات",
    zoneId: "zn-tanta",
    address: "طنطا - ميدان المحطة",
    branches: 2,
    status: "APPROVED",
    createdAt: "2025-08-19T10:30:00Z",
    totalDeliveries: 356,
  },
];

export const DEMO_CAPTAINS: Captain[] = [
  {
    id: "cp-mohamed",
    fullName: "محمد السيد",
    phone: "01000111222",
    status: "APPROVED",
    availability: "BUSY",
    rating: 4.8,
    totalDeliveries: 1240,
    acceptanceRate: 94,
    completionRate: 98,
    avgDeliveryMinutes: 21,
    zoneId: "zn-tanta",
    vehicleType: "توك توك",
    vehiclePlate: "ط ن ط 4821",
    vehicleStatus: "ACTIVE",
    lat: 30.7905,
    lng: 31.0012,
  },
  {
    id: "cp-ahmed",
    fullName: "أحمد حسن",
    phone: "01000222333",
    status: "APPROVED",
    availability: "AVAILABLE",
    rating: 4.6,
    totalDeliveries: 870,
    acceptanceRate: 88,
    completionRate: 96,
    avgDeliveryMinutes: 24,
    zoneId: "zn-tanta",
    vehicleType: "توك توك",
    vehiclePlate: "ط ن ط 1193",
    vehicleStatus: "ACTIVE",
    lat: 30.7842,
    lng: 30.9931,
  },
  {
    id: "cp-mahmoud",
    fullName: "محمود علي",
    phone: "01000333444",
    status: "APPROVED",
    availability: "AVAILABLE",
    rating: 4.4,
    totalDeliveries: 520,
    acceptanceRate: 81,
    completionRate: 93,
    avgDeliveryMinutes: 27,
    zoneId: "zn-mahalla",
    vehicleType: "توك توك",
    vehiclePlate: "م ح ل 7702",
    vehicleStatus: "MAINTENANCE",
    lat: 30.9721,
    lng: 31.1668,
  },
  {
    id: "cp-eslam",
    fullName: "إسلام محمد",
    phone: "01000444555",
    status: "PENDING",
    availability: "OFFLINE",
    rating: 4.1,
    totalDeliveries: 64,
    acceptanceRate: 76,
    completionRate: 90,
    avgDeliveryMinutes: 30,
    zoneId: "zn-mansoura",
    vehicleType: "توك توك",
    vehiclePlate: "م ن ص 3308",
    vehicleStatus: "ACTIVE",
    lat: 31.0409,
    lng: 31.3785,
  },
];

export const DEMO_CUSTOMERS: Customer[] = [
  { id: "cs-ahmed", name: "أحمد محمد", phone: "01277889900", zoneId: "zn-tanta" },
  { id: "cs-mariam", name: "مريم إبراهيم", phone: "01066554433", zoneId: "zn-tanta" },
  { id: "cs-sara", name: "سارة يوسف", phone: "01155443322", zoneId: "zn-mahalla" },
  { id: "cs-mohamed", name: "محمد جمال", phone: "01288776655", zoneId: "zn-mansoura" },
];

function addr(partial: Partial<Address> & { area: string; street: string; lat: number; lng: number }): Address {
  return {
    governorate: "الغربية",
    city: "طنطا",
    area: partial.area,
    street: partial.street,
    ...(partial.building !== undefined ? { building: partial.building } : {}),
    ...(partial.floor !== undefined ? { floor: partial.floor } : {}),
    ...(partial.apartment !== undefined ? { apartment: partial.apartment } : {}),
    ...(partial.landmark !== undefined ? { landmark: partial.landmark } : {}),
    ...(partial.notes !== undefined ? { notes: partial.notes } : {}),
    lat: partial.lat,
    lng: partial.lng,
  };
}

const BAHR = addr({ area: "وسط البلد", street: "شارع البحر", building: "12", lat: 30.7865, lng: 30.9986, landmark: "بجوار صيدلية النور" });
const STADIUM = addr({ area: "منطقة الاستاد", street: "شارع الجيش", building: "7", floor: "الثالث", apartment: "8", lat: 30.7961, lng: 31.0075, landmark: "أمام بوابة الاستاد" });
const SAAH = addr({ area: "الساعة", street: "شارع الجلاء", building: "24", floor: "الأول", apartment: "3", lat: 30.7803, lng: 31.0121 });
const MAHATTA = addr({ area: "ميدان المحطة", street: "شارع سعيد", building: "3", lat: 30.7889, lng: 30.9921 });

let seq = 120;
function makeDelivery(opts: {
  merchantId: string;
  captainId: string | null;
  customerName: string;
  customerPhone: string;
  pickup: Address;
  destination: Address;
  zoneId: string;
  packageType: PackageType;
  size: "SMALL" | "MEDIUM" | "LARGE";
  weight: number;
  description: string;
  cod: number;
  status: DeliveryStatus;
  minutesAgo: number;
  instructions?: string;
  rating?: number;
}): Delivery {
  seq += 1;
  const id = `TK-2026-00${seq}`;
  const distanceKm = estimateDistanceKm(opts.pickup, opts.destination);
  const etaMinutes = estimateMinutes(distanceKm, "STANDARD");
  const price = calculatePrice(
    { distanceKm, size: opts.size, priority: "STANDARD" },
    DEFAULT_PRICING,
  );
  const created = new Date(Date.now() - opts.minutesAgo * 60_000);
  const order: DeliveryStatus[] = [
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
  const reached = order.slice(0, Math.max(1, order.indexOf(opts.status) + 1));
  const timeline = (reached.length ? reached : [opts.status]).map((status, i) => ({
    status,
    at: new Date(created.getTime() + i * 4 * 60_000).toISOString(),
    actor: i < 2 ? "النظام" : "الكابتن",
  }));
  if (!reached.includes(opts.status)) {
    timeline.push({ status: opts.status, at: new Date(created.getTime() + 8 * 60_000).toISOString(), actor: "النظام" });
  }
  return {
    id,
    merchantId: opts.merchantId,
    captainId: opts.captainId,
    customerName: opts.customerName,
    customerPhone: opts.customerPhone,
    pickup: opts.pickup,
    destination: opts.destination,
    zoneId: opts.zoneId,
    packageType: opts.packageType,
    packageSize: opts.size,
    packageWeightKg: opts.weight,
    description: opts.description,
    ...(opts.instructions !== undefined ? { instructions: opts.instructions } : {}),
    codAmount: opts.cod,
    priority: "STANDARD",
    distanceKm,
    etaMinutes,
    price,
    status: opts.status,
    createdAt: created.toISOString(),
    updatedAt: timeline[timeline.length - 1]?.at ?? created.toISOString(),
    timeline,
    ...(opts.rating !== undefined ? { rating: opts.rating } : {}),
  };
}

export const FEATURED_DELIVERY_ID = "TK-2026-00128";

export function buildDemoDeliveries(): Delivery[] {
  const list: Delivery[] = [
    makeDelivery({
      merchantId: "mr-rahma",
      captainId: "cp-mohamed",
      customerName: "أحمد محمد",
      customerPhone: "01277889900",
      pickup: BAHR,
      destination: STADIUM,
      zoneId: "zn-tanta",
      packageType: "FOOD",
      size: "MEDIUM",
      weight: 4,
      description: "٢ صندوق فطير و٤ عيش فينو",
      cod: 250,
      status: "IN_TRANSIT",
      minutesAgo: 26,
      instructions: "الشقة في الدور الثالث، الجرس معطل — كلّم العميل.",
    }),
    makeDelivery({
      merchantId: "mr-madina",
      captainId: "cp-ahmed",
      customerName: "مريم إبراهيم",
      customerPhone: "01066554433",
      pickup: STADIUM,
      destination: SAAH,
      zoneId: "zn-tanta",
      packageType: "GROCERY",
      size: "LARGE",
      weight: 11,
      description: "طلب بقالة شهري",
      cod: 420,
      status: "ARRIVED_AT_PICKUP",
      minutesAgo: 14,
    }),
    makeDelivery({
      merchantId: "mr-halawany",
      captainId: null,
      customerName: "سارة يوسف",
      customerPhone: "01155443322",
      pickup: MAHATTA,
      destination: STADIUM,
      zoneId: "zn-tanta",
      packageType: "OTHER",
      size: "SMALL",
      weight: 1.5,
      description: "علبة حلويات",
      cod: 0,
      status: "SEARCHING_CAPTAIN",
      minutesAgo: 5,
    }),
    makeDelivery({
      merchantId: "mr-rahma",
      captainId: "cp-mohamed",
      customerName: "محمد جمال",
      customerPhone: "01288776655",
      pickup: BAHR,
      destination: MAHATTA,
      zoneId: "zn-tanta",
      packageType: "FOOD",
      size: "SMALL",
      weight: 2,
      description: "طلب إفطار",
      cod: 90,
      status: "DELIVERED",
      minutesAgo: 190,
      rating: 5,
    }),
    makeDelivery({
      merchantId: "mr-beit",
      captainId: "cp-ahmed",
      customerName: "هدى سمير",
      customerPhone: "01099001122",
      pickup: SAAH,
      destination: BAHR,
      zoneId: "zn-tanta",
      packageType: "FOOD",
      size: "MEDIUM",
      weight: 3,
      description: "٢ وجبة مشويات",
      cod: 310,
      status: "DELIVERED",
      minutesAgo: 320,
      rating: 4,
    }),
    makeDelivery({
      merchantId: "mr-madina",
      captainId: null,
      customerName: "طارق فؤاد",
      customerPhone: "01277001199",
      pickup: STADIUM,
      destination: MAHATTA,
      zoneId: "zn-tanta",
      packageType: "SMALL_PARCEL",
      size: "SMALL",
      weight: 0.8,
      description: "مستندات",
      cod: 0,
      status: "CANCELLED",
      minutesAgo: 400,
    }),
    makeDelivery({
      merchantId: "mr-halawany",
      captainId: "cp-mohamed",
      customerName: "نادية رأفت",
      customerPhone: "01011009988",
      pickup: MAHATTA,
      destination: SAAH,
      zoneId: "zn-tanta",
      packageType: "CLOTHING",
      size: "MEDIUM",
      weight: 2.5,
      description: "٣ قطع ملابس",
      cod: 180,
      status: "FAILED",
      minutesAgo: 520,
    }),
    makeDelivery({
      merchantId: "mr-beit",
      captainId: null,
      customerName: "يوسف عادل",
      customerPhone: "01155009911",
      pickup: BAHR,
      destination: STADIUM,
      zoneId: "zn-tanta",
      packageType: "FOOD",
      size: "SMALL",
      weight: 1.2,
      description: "طلب عشاء",
      cod: 145,
      status: "PENDING",
      minutesAgo: 2,
    }),
  ];
  // Ensure the featured demo order id is stable and first.
  const first = list[0];
  if (first) list[0] = { ...first, id: FEATURED_DELIVERY_ID };
  return list;
}

export function buildDemoNotifications(): AppNotification[] {
  const now = Date.now();
  return [
    {
      id: "nt-1",
      type: "PICKED_UP",
      titleAr: "الكابتن محمد استلم طلبك وبدأ التوصيل.",
      titleEn: "Captain Mohamed picked up your order and started the trip.",
      deliveryId: FEATURED_DELIVERY_ID,
      at: new Date(now - 9 * 60_000).toISOString(),
      read: false,
    },
    {
      id: "nt-2",
      type: "APPROACHING",
      titleAr: "طلبك قرب يوصل.",
      titleEn: "Your order is arriving soon.",
      deliveryId: FEATURED_DELIVERY_ID,
      at: new Date(now - 4 * 60_000).toISOString(),
      read: false,
    },
    {
      id: "nt-3",
      type: "COD",
      titleAr: "تحصيل نقدي مطلوب: 250 جنيه عند التسليم.",
      titleEn: "Cash collection required: 250 EGP on delivery.",
      deliveryId: FEATURED_DELIVERY_ID,
      at: new Date(now - 20 * 60_000).toISOString(),
      read: true,
    },
    {
      id: "nt-4",
      type: "DELIVERED",
      titleAr: "تم تسليم الطلب بنجاح.",
      titleEn: "Order delivered successfully.",
      at: new Date(now - 150 * 60_000).toISOString(),
      read: true,
    },
  ];
}

export function buildDemoTickets(): SupportTicket[] {
  return [
    {
      id: "SP-1042",
      category: "WRONG_ADDRESS",
      subject: "العنوان مكتوب غلط في الطلب",
      status: "IN_PROGRESS",
      createdAt: new Date(Date.now() - 60 * 60_000).toISOString(),
      messages: [
        { from: "USER", body: "العميل قال إن رقم العمارة مختلف.", at: new Date(Date.now() - 58 * 60_000).toISOString() },
        { from: "SUPPORT", body: "تم تحديث العنوان وإبلاغ الكابتن.", at: new Date(Date.now() - 40 * 60_000).toISOString() },
      ],
    },
    {
      id: "SP-1039",
      category: "PAYMENT_ISSUE",
      subject: "مبلغ التحصيل غير مطابق",
      status: "RESOLVED",
      createdAt: new Date(Date.now() - 26 * 60 * 60_000).toISOString(),
      messages: [
        { from: "USER", body: "الكابتن حصّل 300 بدل 310.", at: new Date(Date.now() - 25 * 60 * 60_000).toISOString() },
        { from: "SUPPORT", body: "تمت التسوية في كشف اليوم.", at: new Date(Date.now() - 24 * 60 * 60_000).toISOString() },
      ],
    },
  ];
}

export function buildDemoAudit(): AuditEntry[] {
  const now = Date.now();
  return [
    { id: "au-1", actor: "أحمد (تشغيل)", action: "تعديل قاعدة التسعير: أجرة الأساس 20 ← 25", entity: "pricing", at: new Date(now - 30 * 60_000).toISOString() },
    { id: "au-2", actor: "النظام", action: "إنشاء طلب TK-2026-00128", entity: "delivery", at: new Date(now - 26 * 60_000).toISOString() },
    { id: "au-3", actor: "النظام", action: "تعيين الكابتن محمد السيد", entity: "delivery", at: new Date(now - 24 * 60_000).toISOString() },
    { id: "au-4", actor: "منى (تشغيل)", action: "اعتماد تاجر: حلويات طنطا", entity: "merchant", at: new Date(now - 300 * 60_000).toISOString() },
  ];
}

export const DEMO_DAILY_VOLUME = [
  { day: "السبت", dayEn: "Sat", deliveries: 128, revenue: 4480 },
  { day: "الأحد", dayEn: "Sun", deliveries: 143, revenue: 5005 },
  { day: "الاثنين", dayEn: "Mon", deliveries: 118, revenue: 4130 },
  { day: "الثلاثاء", dayEn: "Tue", deliveries: 156, revenue: 5460 },
  { day: "الأربعاء", dayEn: "Wed", deliveries: 171, revenue: 5985 },
  { day: "الخميس", dayEn: "Thu", deliveries: 194, revenue: 6790 },
  { day: "الجمعة", dayEn: "Fri", deliveries: 87, revenue: 3045 },
];
