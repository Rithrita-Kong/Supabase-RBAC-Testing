import { Outlet } from "react-router-dom";
import { SessionProvider } from "@/context/SessionContext";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const Providers = () => {
  return (
    <SessionProvider>
      <div>
        <Toaster position="top-right" />
        <Outlet />
        <Analytics />
      </div>
    </SessionProvider>
  );
};

export default Providers;
