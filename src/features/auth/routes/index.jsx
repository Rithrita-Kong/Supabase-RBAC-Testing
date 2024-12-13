import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};
