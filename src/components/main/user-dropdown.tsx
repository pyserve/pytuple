"use client";

import { useState } from "react";
import Link from "next/link";
import { User, LogOut, Settings, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function UserDropdown() {
  const { user, profile, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="hidden md:block">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    );
  }

  const initials =
    profile.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("") ||
    user.email?.[0]?.toUpperCase() ||
    "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        <Avatar>
          <AvatarImage
            src={profile.avatar_url || undefined}
            alt={profile.full_name || user.email || ""}
          />
          <AvatarFallback className="bg-slate-800 text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">
            {profile.full_name || user.email}
          </p>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-slate-900 border-slate-800"
      >
        <DropdownMenuLabel className="text-slate-300">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-800" />
        <DropdownMenuItem
          asChild
          className="text-slate-300 focus:bg-slate-800 focus:text-white cursor-pointer"
        >
          <Link href="/dashboard/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="text-slate-300 focus:bg-slate-800 focus:text-white cursor-pointer"
        >
          <Link href="/dashboard/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="text-slate-300 focus:bg-slate-800 focus:text-white cursor-pointer"
        >
          <Link href="/help" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-800" />
        <div className="p-2">
          <Button
            variant="destructive"
            className="w-full justify-start"
            disabled={isLoggingOut}
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? "Logging out..." : "Log out"}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
