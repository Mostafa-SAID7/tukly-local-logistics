import { Link } from "react-router-dom";
import { Store } from "lucide-react";

import { Bullet, PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_MERCHANTS } from "@/data/demo";
import { usePageMeta } from "@/lib/usePageMeta";
import { useI18n } from "@/lib/i18n";
import merchantsImg from "@/assets/merchants.jpg";


function MerchantsPage() {

  usePageMeta("TUKLY for merchants — send local orders same day", "Shops and restaurants send parcels with TUKLY captains: clear commission, live tracking and cash-on-delivery settlement.");
  const { t, label, lang } = useI18n();

  return (
    <SiteLayout>
      <PageHeader title={t("navMerchants")} subtitle={t("forMerchantsCopy")} />

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <Card className="overflow-hidden rounded-3xl">
          <img
            src={merchantsImg}
            alt="Shop owner handing a parcel to a delivery courier"
            width={1200}
            height={912}
            className="h-56 w-full object-cover sm:h-72"
          />
          <CardContent className="p-6 sm:p-8">
            <Store className="size-6 text-primary" />
            <ul className="mt-5 space-y-2 text-sm">
              <Bullet>{t("newDelivery")}</Bullet>
              <Bullet>{t("tracking")}</Bullet>
              <Bullet>
                {t("commission")}: 18% · {t("avgDeliveryTime")}: 32 {lang === "ar" ? "دقيقة" : "min"}
              </Bullet>
            </ul>
            <Button className="mt-6 rounded-full" asChild>
              <Link to="/zones">{t("ctaMerchant")}</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_MERCHANTS.map((merchant) => (
            <Card key={merchant.id} className="rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold">{merchant.businessName}</h2>
                  <Badge
                    variant={merchant.status === "APPROVED" ? "default" : "secondary"}
                    className="rounded-full"
                  >
                    {label(merchant.status)}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t("deliveries")}: {merchant.totalDeliveries}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

export default MerchantsPage;
