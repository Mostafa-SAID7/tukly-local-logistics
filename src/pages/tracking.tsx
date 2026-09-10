import { useMemo } from "react";
import { Clock, MapPin } from "lucide-react";

import { PageHeader, Row, SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { buildDemoDeliveries } from "@/data/demo";
import { PROGRESS_STEPS } from "@/lib/delivery-status";
import { usePageMeta } from "@/lib/usePageMeta";
import { useI18n } from "@/lib/i18n";
import trackingMapImg from "@/assets/tracking-map.jpg";


function TrackingPage() {

  usePageMeta("Live delivery tracking — TUKLY", "Follow a TUKLY delivery in real time: pickup, captain progress, ETA, distance and the full price breakdown.");
  const { t, label, money, lang } = useI18n();
  const deliveries = useMemo(() => buildDemoDeliveries(), []);
  const featured = deliveries.find((d) => d.status === "IN_TRANSIT") ?? deliveries[0];

  const stepIndex = featured ? PROGRESS_STEPS.indexOf(featured.status) : -1;
  const progress = stepIndex >= 0 ? ((stepIndex + 1) / PROGRESS_STEPS.length) * 100 : 20;

  return (
    <SiteLayout>
      <PageHeader title={t("trackingTitle")} subtitle={t("liveMap")} />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {featured ? (
          <Card className="overflow-hidden rounded-3xl">
            <CardContent className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full">{label(featured.status)}</Badge>
                  <span className="font-mono text-sm text-muted-foreground">{featured.id}</span>
                </div>
                <Progress value={progress} className="mt-4" />
                <div className="mt-5 space-y-3 text-sm">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 text-primary" />
                    <span>
                      {t("stepPickup")}: {featured.pickup.area} — {featured.pickup.street}
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 text-primary" />
                    <span>
                      {t("stepDestination")}: {featured.destination.area} —{" "}
                      {featured.destination.street}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4" />
                    {t("eta")}: {featured.etaMinutes} {lang === "ar" ? "دقيقة" : "min"} ·{" "}
                    {t("distance")}: {featured.distanceKm} km
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-muted/60 p-5">
                <img
                  src={trackingMapImg}
                  alt="Map showing the delivery route from pickup to drop-off"
                  width={1200}
                  height={1200}
                  loading="lazy"
                  className="mb-5 aspect-[4/3] w-full rounded-xl object-cover"
                />
                <p className="text-sm font-semibold">{t("summary")}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <Row label={t("packageType")} value={label(featured.packageType)} />
                  <Row label={t("packageSize")} value={label(featured.packageSize)} />
                  <Row label={t("deliveryFee")} value={money(featured.price.total)} />
                  <Row label={t("captainEarning")} value={money(featured.price.captainEarning)} />
                  <Row label={t("codAmount")} value={money(featured.codAmount)} />
                </dl>
                <p className="mt-5 text-xs text-muted-foreground">{t("demoNote")}</p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </section>
    </SiteLayout>
  );
}

export default TrackingPage;
