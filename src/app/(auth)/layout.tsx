import { AuthProvider } from "@/components/providers/auth-provider";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
