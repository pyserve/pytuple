import { setAuthToken } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function AuthTokenSetter({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.token) {
      setAuthToken(session.token);
    } else if (status === "unauthenticated") {
      setAuthToken(null);
    }
  }, [session, status]);

  return <>{children}</>;
}
