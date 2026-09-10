import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function LangToggle() {
  const { lang, toggleLang } = useI18n();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLang}
      className="rounded-full font-medium"
      aria-label="Toggle language"
    >
      {lang === "ar" ? "EN" : "عربي"}
    </Button>
  );
}
