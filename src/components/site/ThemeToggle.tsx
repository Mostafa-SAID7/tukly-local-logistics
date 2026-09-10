import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "theme";

function apply(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const isDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);

    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(next);
      return;
    }

    const transition = doc.startViewTransition(() => apply(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`],
        },
        {
          duration: 520,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <Button
      ref={btnRef}
      variant="outline"
      size="icon"
      onClick={toggle}
      className="relative overflow-hidden rounded-full"
      aria-label="Toggle theme"
      aria-pressed={dark}
    >
      <Sun
        className="size-4 transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] data-[off=true]:-rotate-90 data-[off=true]:scale-0 data-[off=true]:opacity-0"
        data-off={dark}
      />
      <Moon
        className="absolute size-4 transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] data-[off=true]:rotate-90 data-[off=true]:scale-0 data-[off=true]:opacity-0"
        data-off={!dark}
      />
    </Button>
  );
}
