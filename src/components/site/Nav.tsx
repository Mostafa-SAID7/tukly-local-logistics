import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Bike } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LangToggle } from "@/components/site/LangToggle";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/how-it-works", key: "navHow" },
  { to: "/merchants", key: "navMerchants" },
  { to: "/captains", key: "navCaptains" },
  { to: "/tracking", key: "tracking" },
  { to: "/zones", key: "navZones" },
  { to: "/faq", key: "navFaq" },
] as const;

export function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Bike className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">{t("brand")}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "bg-muted text-foreground" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <Button size="sm" className="hidden rounded-full sm:inline-flex" asChild>
            <Link to="/merchants">{t("ctaMerchant")}</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t("navHome")}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border/60 transition-[grid-template-rows,opacity] duration-300 md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <nav className="flex min-h-0 flex-col px-4 py-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {t("navHome")}
          </Link>
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
