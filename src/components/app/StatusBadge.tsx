import { statusTone } from "@/lib/delivery-status";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { DeliveryStatus } from "@/types/domain";

const TONE_CLASS: Record<string, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-secondary/15 text-secondary",
  active: "bg-accent/20 text-accent-foreground",
  success: "bg-success/15 text-success",
  danger: "bg-destructive/15 text-destructive",
};

export function StatusBadge({ status, className }: { status: DeliveryStatus; className?: string }) {
  const { label } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        TONE_CLASS[statusTone(status)],
        className,
      )}
    >
      {label(status)}
    </span>
  );
}
