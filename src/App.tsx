import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@/lib/i18n";
import HomePage from "@/pages/HomePage";
import HowItWorksPage from "@/pages/how-it-works";
import MerchantsPage from "@/pages/merchants";
import CaptainsPage from "@/pages/captains";
import TrackingPage from "@/pages/tracking";
import ZonesPage from "@/pages/zones";
import FaqPage from "@/pages/faq";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/merchants" element={<MerchantsPage />} />
          <Route path="/captains" element={<CaptainsPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/zones" element={<ZonesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
