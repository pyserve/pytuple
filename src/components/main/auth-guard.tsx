"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

// Routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/forgot-password"];

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  useEffect(() => {
    // Only check authorization after loading is complete
    if (!isLoading) {
      // For public routes, no authentication needed
      if (isPublicRoute) {
        setIsAuthorized(true);
      }
      // For auth routes, redirect to dashboard if already logged in
      else if (pathname === "/login" || pathname === "/register") {
        if (user) {
          router.replace("/dashboard");
        } else {
          setIsAuthorized(true);
        }
      }
      // For protected routes, redirect to login if not logged in
      else {
        if (!user) {
          router.replace("/login");
        } else {
          setIsAuthorized(true);
        }
      }
      setIsInitialLoad(false);
    }
  }, [user, isLoading, pathname, router, isPublicRoute]);

  // Show loading spinner only during initial load and for non-public routes
  if (isInitialLoad || (!isAuthorized && !isPublicRoute)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950">
        <Spinner size="lg" className="text-white" />
      </div>
    );
  }

  return <>{children}</>;
}
