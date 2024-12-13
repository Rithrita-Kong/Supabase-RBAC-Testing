import { Outlet } from "react-router-dom";
import { SessionProvider } from "@/context/SessionContext";
import { Toaster } from "react-hot-toast";

const Providers = () => {
  return (
    <SessionProvider>
      <div>
        <Toaster position="top-right" /> {/* Toast container */}
        <Outlet />
      </div>
    </SessionProvider>
  );
};

export default Providers;
