import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { lazyImport } from "@/utils/lazyImport";

const { AuthRoutes } = lazyImport(
  () => import("@/features/auth"),
  "AuthRoutes"
);

export const AppRoutes = () => {
  const routes = [
    { path: "/login", element: <AuthRoutes /> },
    { path: "*", element: <Navigate to="/" /> },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};
