import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkeletonTheme>
      <App />
    </SkeletonTheme>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
