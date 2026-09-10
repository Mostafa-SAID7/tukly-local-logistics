import { Link } from "react-router-dom";
import { Clock, MapPin, Package } from "lucide-react";

import { StatusBadge } from "@/components/app/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import type { Delivery } from "@/types/domain";

export function DeliveryCard({ delivery }: { delivery: Delivery }) {
  const { t, money } = useI18n();

  return (
    <Card className="card-lift">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/app/deliveries/${delivery.id}`} className="font-semibold hover:underline">
              {delivery.id}
            </Link>
            <p className="truncate text-sm text-muted-foreground">{delivery.customerName}</p>
          </div>
          <StatusBadge status={delivery.status} />
        </div>

        <div className="mt-3 grid gap-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" />
            <span className="truncate">
              {delivery.pickup.area} → {delivery.destination.area}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Package className="size-4 shrink-0 text-primary" />
            <span className="truncate">{delivery.description}</span>
          </p>
          <p className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-primary" />
            <span>
              {delivery.etaMinutes} {t("minutes")} · {delivery.distanceKm} {t("km")}
            </span>
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-sm">
          <span className="font-semibold">{money(delivery.price.total)}</span>
          <span className="text-muted-foreground">
            {delivery.codAmount > 0 ? `${t("cod")}: ${money(delivery.codAmount)}` : t("noCod")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
