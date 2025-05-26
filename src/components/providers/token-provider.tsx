import { useSession } from "next-auth/react";

export function AuthTokenSetter({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  return <>{children}</>;
}
