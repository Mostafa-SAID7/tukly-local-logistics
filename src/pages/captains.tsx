import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

import { Bullet, PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_CAPTAINS, DEMO_DAILY_VOLUME } from "@/data/demo";
import { usePageMeta } from "@/lib/usePageMeta";
import { useI18n } from "@/lib/i18n";
import captainsImg from "@/assets/captains.jpg";


function CaptainsPage() {

  usePageMeta("Drive with TUKLY — earnings for TukTok captains", "Captains pick up nearby delivery requests, track daily earnings and keep a transparent acceptance rate with TUKLY.");
  const { t, label, money, lang } = useI18n();
  const busiestDay = DEMO_DAILY_VOLUME.reduce((a, b) => (b.deliveries > a.deliveries ? b : a));

  return (
    <SiteLayout>
      <PageHeader title={t("navCaptains")} subtitle={t("forCaptainsCopy")} />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <Card className="overflow-hidden rounded-3xl">
          <img
            src={captainsImg}
            alt="Tuk tuk captain checking new delivery requests on his phone"
            width={1200}
            height={912}
            className="h-56 w-full object-cover sm:h-72"
          />
          <CardContent className="p-6 sm:p-8">
            <Wallet className="size-6 text-primary" />
            <ul className="mt-5 space-y-2 text-sm">
              <Bullet>
                {t("todayEarnings")}: {money(240)}
              </Bullet>
              <Bullet>
                {t("availableRequests")} · {t("acceptanceRate")}
              </Bullet>
              <Bullet>
                {busiestDay.deliveries} {t("deliveries")} —{" "}
                {lang === "ar" ? busiestDay.day : busiestDay.dayEn}
              </Bullet>
            </ul>
            <Button variant="outline" className="mt-6 rounded-full" asChild>
              <Link to="/zones">{t("ctaCaptain")}</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_CAPTAINS.map((captain) => (
            <Card key={captain.id} className="rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold">{captain.fullName}</h2>
                  <Badge
                    variant={captain.availability === "AVAILABLE" ? "default" : "secondary"}
                    className="rounded-full"
                  >
                    {label(captain.availability)}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t("deliveries")}: {captain.totalDeliveries} · ★ {captain.rating}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("avgDeliveryTime")}: {captain.avgDeliveryMinutes}{" "}
                  {lang === "ar" ? "دقيقة" : "min"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

export default CaptainsPage;
