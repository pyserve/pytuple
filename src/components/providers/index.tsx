"use client";

import type React from "react";

import { Toaster } from "sonner";
import { AppHeader } from "../app-header";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";

export function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="relative w-full flex flex-col overflow-auto">
            <AppHeader />
            {children}
          </main>
        </SidebarProvider>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
