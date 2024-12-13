import React from "react";
import { AppProvider } from "@/context/AppProvider";
import { AppRoutes } from "@/routes";

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
