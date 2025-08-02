import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkeletonTheme>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SkeletonTheme>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
