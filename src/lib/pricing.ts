import type {
  PackageSize,
  PriceBreakdown,
  PricingConfig,
  Priority,
  ServiceZone,
} from "@/types/domain";

export const DEFAULT_PRICING: PricingConfig = {
  baseFee: 25,
  perKmFee: 4,
  minFee: 20,
  maxFee: 180,
  largePackageSurcharge: 10,
  mediumPackageSurcharge: 5,
  prioritySurcharge: 15,
  waitingFeePerMin: 1,
  commissionRate: 0.18,
};

export interface PriceInput {
  distanceKm: number;
  size: PackageSize;
  priority: Priority;
  waitingMinutes?: number;
  zone?: ServiceZone;
}

const round = (n: number) => Math.round(n * 10) / 10;

export function calculatePrice(input: PriceInput, config: PricingConfig): PriceBreakdown {
  const base = input.zone?.baseFee ?? config.baseFee;
  const perKm = input.zone?.perKmFee ?? config.perKmFee;

  const distance = round(input.distanceKm * perKm);
  const handling =
    input.size === "LARGE"
      ? config.largePackageSurcharge
      : input.size === "MEDIUM"
        ? config.mediumPackageSurcharge
        : 0;
  const priority = input.priority === "EXPRESS" ? config.prioritySurcharge : 0;
  const waiting = round((input.waitingMinutes ?? 0) * config.waitingFeePerMin);

  const raw = base + distance + handling + priority + waiting;
  const total = round(Math.min(config.maxFee, Math.max(config.minFee, raw)));
  const commission = round(total * config.commissionRate);

  return {
    base,
    distance,
    handling,
    priority,
    waiting,
    total,
    commission,
    captainEarning: round(total - commission),
  };
}

/** Mock haversine-ish distance from demo coordinates (km). */
export function estimateDistanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dLat = (b.lat - a.lat) * 111;
  const dLng = (b.lng - a.lng) * 111 * Math.cos((a.lat * Math.PI) / 180);
  return Math.max(0.6, round(Math.sqrt(dLat * dLat + dLng * dLng)));
}

export function estimateMinutes(distanceKm: number, priority: Priority): number {
  const speed = priority === "EXPRESS" ? 22 : 17; // km/h in dense streets
  return Math.max(8, Math.round((distanceKm / speed) * 60) + 6);
}
