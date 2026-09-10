
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_ZONES } from "@/data/demo";
import { usePageMeta } from "@/lib/usePageMeta";
import { useI18n } from "@/lib/i18n";
import zoneCityImg from "@/assets/zone-city.jpg";


function ZonesPage() {

  usePageMeta("TUKLY service zones and delivery pricing", "Coverage and per-zone pricing for TUKLY: Tanta, Mahalla, Mansoura and more, with base fee, per-km fee and working hours.");
  const { t, label, money, lang } = useI18n();

  return (
    <SiteLayout>
      <PageHeader title={t("zones")} subtitle={t("pricing")} />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_ZONES.map((zone) => (
            <Card key={zone.id} className="overflow-hidden rounded-2xl">
              <img
                src={zoneCityImg}
                alt={`Aerial view of the ${zone.nameEn} service zone`}
                width={1200}
                height={800}
                loading="lazy"
                className="h-32 w-full object-cover"
              />
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold">{lang === "ar" ? zone.nameAr : zone.nameEn}</h2>
                  <Badge
                    variant={zone.status === "ACTIVE" ? "default" : "secondary"}
                    className="rounded-full"
                  >
                    {label(zone.status)}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t("deliveryFee")}: {money(zone.baseFee)} + {money(zone.perKmFee)}/km
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {zone.hours.from} – {zone.hours.to} · {zone.radiusKm} km
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

export default ZonesPage;
