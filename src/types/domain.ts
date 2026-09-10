export type Role = "CUSTOMER" | "MERCHANT" | "CAPTAIN" | "ADMIN" | "OPERATIONS" | "SUPPORT";

export const DELIVERY_STATUSES = [
  "DRAFT",
  "PENDING",
  "SEARCHING_CAPTAIN",
  "ASSIGNED",
  "CAPTAIN_EN_ROUTE_TO_PICKUP",
  "ARRIVED_AT_PICKUP",
  "PICKED_UP",
  "IN_TRANSIT",
  "ARRIVED_AT_DESTINATION",
  "DELIVERED",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
] as const;

export type DeliveryStatus = (typeof DELIVERY_STATUSES)[number];

export const PACKAGE_TYPES = [
  "FOOD",
  "GROCERY",
  "CLOTHING",
  "ELECTRONICS",
  "DOCUMENTS",
  "PHARMACY",
  "SMALL_PARCEL",
  "OTHER",
] as const;
export type PackageType = (typeof PACKAGE_TYPES)[number];

export const PACKAGE_SIZES = ["SMALL", "MEDIUM", "LARGE"] as const;
export type PackageSize = (typeof PACKAGE_SIZES)[number];

export const PRIORITIES = ["STANDARD", "EXPRESS"] as const;
export type Priority = (typeof PRIORITIES)[number];

export interface Address {
  governorate: string;
  city: string;
  area: string;
  street: string;
  building?: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  notes?: string;
  lat: number;
  lng: number;
}

export interface ServiceZone {
  id: string;
  nameAr: string;
  nameEn: string;
  city: string;
  status: "ACTIVE" | "PAUSED";
  radiusKm: number;
  baseFee: number;
  perKmFee: number;
  maxWeightKg: number;
  maxDimensionCm: number;
  hours: { from: string; to: string };
}

export interface PricingConfig {
  baseFee: number;
  perKmFee: number;
  minFee: number;
  maxFee: number;
  largePackageSurcharge: number;
  mediumPackageSurcharge: number;
  prioritySurcharge: number;
  waitingFeePerMin: number;
  commissionRate: number;
}

export interface PriceBreakdown {
  base: number;
  distance: number;
  handling: number;
  priority: number;
  waiting: number;
  total: number;
  commission: number;
  captainEarning: number;
}

export interface Merchant {
  id: string;
  businessName: string;
  owner: string;
  phone: string;
  email: string;
  category: string;
  zoneId: string;
  address: string;
  branches: number;
  status: "PENDING" | "APPROVED" | "SUSPENDED";
  createdAt: string;
  totalDeliveries: number;
}

export interface Captain {
  id: string;
  fullName: string;
  phone: string;
  status: "PENDING" | "APPROVED" | "SUSPENDED";
  availability: "OFFLINE" | "AVAILABLE" | "BUSY";
  rating: number;
  totalDeliveries: number;
  acceptanceRate: number;
  completionRate: number;
  avgDeliveryMinutes: number;
  zoneId: string;
  vehicleType: string;
  vehiclePlate: string;
  vehicleStatus: "ACTIVE" | "MAINTENANCE";
  lat: number;
  lng: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  zoneId: string;
}

export interface DeliveryEvent {
  status: DeliveryStatus;
  at: string;
  actor: string;
}

export interface Delivery {
  id: string;
  merchantId: string;
  captainId: string | null;
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
  distanceKm: number;
  etaMinutes: number;
  price: PriceBreakdown;
  status: DeliveryStatus;
  createdAt: string;
  updatedAt: string;
  timeline: DeliveryEvent[];
  rating?: number;
}

export interface AppNotification {
  id: string;
  type:
    | "ASSIGNED"
    | "ARRIVING"
    | "PICKED_UP"
    | "APPROACHING"
    | "DELIVERED"
    | "CANCELLED"
    | "COD"
    | "SYSTEM";
  titleAr: string;
  titleEn: string;
  deliveryId?: string;
  at: string;
  read: boolean;
}

export interface SupportTicket {
  id: string;
  category:
    | "DELIVERY_PROBLEM"
    | "MISSING_PACKAGE"
    | "DAMAGED_PACKAGE"
    | "WRONG_ADDRESS"
    | "CAPTAIN_ISSUE"
    | "MERCHANT_ISSUE"
    | "PAYMENT_ISSUE"
    | "OTHER";
  subject: string;
  status: "OPEN" | "IN_PROGRESS" | "WAITING_FOR_USER" | "RESOLVED" | "CLOSED";
  createdAt: string;
  messages: { from: "USER" | "SUPPORT"; body: string; at: string }[];
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  entity: string;
  at: string;
}
