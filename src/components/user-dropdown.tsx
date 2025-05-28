"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function UserDropdown() {
  const { data: session } = useSession();
  const [IsLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center outline-none">
        <Avatar className="w-7 h-7 rounded-md">
          <AvatarImage
            src={session?.user?.image || undefined}
            alt={session?.user?.name || session?.user?.email || ""}
          />
          <AvatarFallback>
            {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 ">
        <DropdownMenuLabel className="">
          <div className="capitalize text-lg">{session?.user?.name}</div>
          <div className="text-sm">{session?.user?.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <DropdownMenuItem asChild className=" cursor-pointer">
          <Link href="/" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className=" cursor-pointer">
          <Link href="/" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className=" cursor-pointer">
          <Link href="/" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="" />
        <div className="">
          <Button
            className="w-full justify-start"
            variant={"ghost"}
            onClick={() => {
              setIsLoggingOut(true);
              signOut();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {IsLoggingOut ? "Logging out..." : "Log out"}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
