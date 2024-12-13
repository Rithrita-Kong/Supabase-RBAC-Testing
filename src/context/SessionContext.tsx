import { createContext, useContext, useEffect, useState } from "react";
import { getUserRole } from "@/api/getRole"; // Import the helper
import supabase from "@/lib/supabase";
import LoadingPage from "@/pages/LoadingPage";
import { Session } from "@supabase/supabase-js";

const SessionContext = createContext<{
  session: Session | null;
  userRole: string | null;
}>({
  session: null,
  userRole: null,
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

type Props = { children: React.ReactNode };
export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []); // Empty dependency array to only run on mount/unmount

  useEffect(() => {
    if (session?.user) {
      const fetchRole = async () => {
        const role = await getUserRole(session.user.id);
        setUserRole(role);
      };
      fetchRole();
    } else {
      setUserRole(null);
    }
  }, [session]); // Runs when session changes, not repeatedly

  return (
    <SessionContext.Provider value={{ session, userRole }}>
      {isLoading ? <LoadingPage /> : children}
    </SessionContext.Provider>
  );
};
