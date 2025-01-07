import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./main.css";
import { NotificationProvider } from "./contexts/NotificationContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  </StrictMode>
);
