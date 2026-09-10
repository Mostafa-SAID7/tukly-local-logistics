import { cn } from "@/lib/utils";

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  tone?: "primary" | "accent" | "success" | "muted";
}

const TONE: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  muted: "bg-muted text-muted-foreground",
};

/** Lightweight schematic map — plots demo coordinates on a normalized grid. */
export function DemoMap({
  points,
  className,
  onPick,
}: {
  points: MapPoint[];
  className?: string;
  onPick?: (coords: { lat: number; lng: number }) => void;
}) {
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const minLat = Math.min(...lats, 30.7);
  const maxLat = Math.max(...lats, 30.85);
  const minLng = Math.min(...lngs, 30.9);
  const maxLng = Math.max(...lngs, 31.1);
  const spanLat = maxLat - minLat || 1;
  const spanLng = maxLng - minLng || 1;

  return (
    <div
      role={onPick ? "button" : undefined}
      tabIndex={onPick ? 0 : undefined}
      onClick={
        onPick
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - r.left) / r.width;
              const y = (e.clientY - r.top) / r.height;
              onPick({
                lat: Number((maxLat - y * spanLat).toFixed(4)),
                lng: Number((minLng + x * spanLng).toFixed(4)),
              });
            }
          : undefined
      }
      className={cn(
        "grid-bg ambient-glow relative h-64 w-full overflow-hidden rounded-xl border border-border",
        onPick && "cursor-crosshair",
        className,
      )}
    >
      {points.map((p) => {
        const left = ((p.lng - minLng) / spanLng) * 100;
        const top = ((maxLat - p.lat) / spanLat) * 100;
        return (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${Math.min(94, Math.max(6, left))}%`, top: `${Math.min(92, Math.max(8, top))}%` }}
          >
            <span
              className={cn(
                "whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-semibold shadow-sm",
                TONE[p.tone ?? "primary"],
              )}
            >
              {p.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
