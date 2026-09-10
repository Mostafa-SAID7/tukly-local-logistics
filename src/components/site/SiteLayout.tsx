import type { ReactNode } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { useI18n } from "@/lib/i18n";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useI18n();

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>{children}</main>
      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-4 text-primary" />
            {t("brand")}
          </div>
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          <p className="text-xs text-muted-foreground">{t("demoNote")}</p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-2 pt-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
      ) : null}
    </section>
  );
}

export function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  );
}
