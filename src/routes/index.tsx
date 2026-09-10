import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bike, PackageCheck, Store } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_CAPTAINS, DEMO_MERCHANTS, DEMO_ZONES } from "@/data/demo";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-tuktuk.jpg";
import merchantsImg from "@/assets/merchants.jpg";
import captainsImg from "@/assets/captains.jpg";
import trackingMapImg from "@/assets/tracking-map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TUKLY — Local TukTok delivery for Egyptian merchants" },
      {
        name: "description",
        content:
          "TUKLY connects Egyptian shops with TukTok captains for fast local delivery, live order tracking and transparent per-zone pricing.",
      },
      { property: "og:title", content: "TUKLY — Local TukTok delivery" },
      {
        property: "og:description",
        content:
          "Fast last-mile delivery in Tanta, Mahalla and Mansoura with live tracking and clear pricing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();

  const activeZones = DEMO_ZONES.filter((z) => z.status === "ACTIVE");
  const onlineCaptains = DEMO_CAPTAINS.filter((c) => c.availability !== "OFFLINE").length;
  const totalDeliveries = DEMO_MERCHANTS.reduce((sum, m) => sum + m.totalDeliveries, 0);

  const stats = [
    { value: totalDeliveries.toLocaleString(), key: "totalDeliveries" },
    { value: String(onlineCaptains), key: "onlineCaptains" },
    {
      value: String(DEMO_MERCHANTS.filter((m) => m.status === "APPROVED").length),
      key: "activeMerchants",
    },
    { value: String(activeZones.length), key: "zones" },
  ];

  const cards = [
    {
      to: "/merchants" as const,
      icon: Store,
      title: t("navMerchants"),
      body: t("forMerchantsCopy"),
      img: merchantsImg,
      alt: "Shop owner handing a parcel to a delivery courier",
    },
    {
      to: "/captains" as const,
      icon: Bike,
      title: t("navCaptains"),
      body: t("forCaptainsCopy"),
      img: captainsImg,
      alt: "Tuk tuk captain checking new delivery requests on his phone",
    },
    {
      to: "/tracking" as const,
      icon: PackageCheck,
      title: t("tracking"),
      body: t("forCustomersCopy"),
      img: trackingMapImg,
      alt: "Map showing the delivery route from pickup to drop-off",
    },
  ];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Badge variant="secondary" className="rounded-full">
              {t("demoBadge")}
            </Badge>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("heroSub")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/merchants">
                  {t("ctaMerchant")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link to="/captains">{t("ctaCaptain")}</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map((s) => (
                <Card key={s.key} className="rounded-2xl">
                  <CardContent className="p-4 sm:p-5">
                    <p className="text-2xl font-bold sm:text-3xl">{s.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{t(s.key)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-xl">
            <img
              src={heroImg}
              alt="Tuk tuk delivery captain riding through an Egyptian delta town at sunset"
              width={1600}
              height={1008}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border/50 bg-background/80 p-4 backdrop-blur">
              <p className="text-sm font-semibold">{t("brand")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("tagline")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section entries */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("howItWorks")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <Card key={card.to} className="overflow-hidden rounded-2xl">
              <img
                src={card.img}
                alt={card.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <card.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
                <Button variant="outline" size="sm" className="mt-5 rounded-full" asChild>
                  <Link to={card.to}>
                    {t("navHome")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary" className="rounded-full" asChild>
            <Link to="/how-it-works">{t("howItWorks")}</Link>
          </Button>
          <Button variant="secondary" className="rounded-full" asChild>
            <Link to="/zones">{t("zones")}</Link>
          </Button>
          <Button variant="secondary" className="rounded-full" asChild>
            <Link to="/faq">{t("faq")}</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
