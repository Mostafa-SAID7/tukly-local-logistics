import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DEMO_ZONES } from "@/data/demo";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "TUKLY FAQ — zones, pricing and cash on delivery" },
      {
        name: "description",
        content:
          "Answers about TUKLY coverage areas, delivery fees per kilometre and how cash on delivery is handled.",
      },
      { property: "og:title", content: "TUKLY frequently asked questions" },
      {
        property: "og:description",
        content: "Coverage, fees and cash-on-delivery answers for merchants and customers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t, money, lang } = useI18n();
  const activeZones = DEMO_ZONES.filter((z) => z.status === "ACTIVE");

  const faqs = [
    { q: t("zones"), a: activeZones.map((z) => (lang === "ar" ? z.nameAr : z.nameEn)).join(" · ") },
    {
      q: t("pricing"),
      a: `${t("deliveryFee")}: ${money(DEMO_ZONES[0]?.baseFee ?? 25)} + ${money(DEMO_ZONES[0]?.perKmFee ?? 4)}/km`,
    },
    { q: t("codRequired"), a: t("forCustomersCopy") },
  ];

  return (
    <SiteLayout>
      <PageHeader title={t("faq")} />
      <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <Accordion type="single" collapsible>
          {faqs.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-start">{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteLayout>
  );
}
