import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnalyticsProvider } from "@keiko-app/react-google-analytics";

const queryClient = new QueryClient();
const analyticsConfig = {
  mesureId: import.meta.env.VITE_APP_GA4_MEASUREMENT_ID as string,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkeletonTheme>
      <QueryClientProvider client={queryClient}>
        <AnalyticsProvider config={analyticsConfig}>
          <App />
        </AnalyticsProvider>
      </QueryClientProvider>
    </SkeletonTheme>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
