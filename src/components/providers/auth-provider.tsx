"use client";

import type React from "react";

import { SessionProvider } from "next-auth/react";
import { AuthTokenSetter } from "./token-provider";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthTokenSetter>{children}</AuthTokenSetter>
    </SessionProvider>
  );
}
