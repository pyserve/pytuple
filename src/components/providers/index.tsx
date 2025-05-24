"use client";

import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AppHeader } from "../app-header";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

export function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <AppSidebar />
            <main className="relative w-full flex flex-col overflow-auto">
              <AppHeader />
              {children}
            </main>
          </SidebarProvider>
        </QueryClientProvider>

        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
