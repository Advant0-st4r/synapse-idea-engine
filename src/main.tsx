// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

/**
 * Clerk configuration:
 * - FRONTEND: safe to expose in client (publishable key or frontend API).
 * - SECRET (server) must be stored only on backend (not here).
 *
 * Provide the frontend key via .env: VITE_CLERK_FRONTEND_API
 */
const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

if (!clerkFrontendApi) {
  // Fail fast for developers running locally without env set.
  console.warn("VITE_CLERK_FRONTEND_API is not set. Clerk auth will be disabled in the client.");
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ClerkProvider frontendApi={clerkFrontendApi || ""}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
