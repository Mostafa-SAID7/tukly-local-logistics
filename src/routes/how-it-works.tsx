import { createFileRoute } from "@tanstack/react-router";
import { Bike, PackageCheck, Store } from "lucide-react";

import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How TUKLY delivery works — pickup, ride, drop-off" },
      {
        name: "description",
        content:
          "See how a TUKLY delivery runs end to end: merchant pickup, captain assignment and live drop-off tracking.",
      },
      { property: "og:title", content: "How TUKLY delivery works" },
      {
        property: "og:description",
        content: "Pickup, captain assignment and live drop-off tracking explained step by step.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  const { t } = useI18n();

  const steps = [
    { icon: Store, title: t("stepPickup"), body: t("forMerchantsCopy") },
    { icon: Bike, title: t("stepDestination"), body: t("forCaptainsCopy") },
    { icon: PackageCheck, title: t("tracking"), body: t("forCustomersCopy") },
  ];

  return (
    <SiteLayout>
      <PageHeader title={t("howItWorks")} subtitle={t("heroSub")} />
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <Card key={step.title} className="rounded-2xl">
              <CardContent className="p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </span>
                <p className="mt-4 text-sm font-medium text-muted-foreground">0{i + 1}</p>
                <h2 className="mt-1 text-lg font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
