"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Added Sheet imports
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto md:max-w-6xl">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between border-b border-white/10 px-6 py-4 backdrop-blur-sm"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo4.jpg"
            height={30}
            width={30}
            alt="TupleAI Logo"
            className="mx-auto rounded-full bg-red-200"
          />
          <span className="font-medium text-xl text-white">TupleAI</span>
        </Link>
        <div className="hidden items-center space-x-8 md:flex">
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/how-it-works">How it Works</NavLink>
          <NavLink href="/examples">Examples</NavLink>
          {/* <NavLink href="/pricing">Pricing</NavLink> */}
        </div>
        <div className="hidden items-center space-x-4 md:flex">
          {!session ? (
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              className="text-white hover:text-purple-400"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          )}
          <Link href={session?.user ? "/dashboard" : "/login"}>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Get Started
            </Button>
          </Link>
        </div>
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[250px] bg-gray-900 text-white sm:w-[300px]"
          >
            <div className="flex flex-col items-start gap-6 p-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logos/logo4.jpg"
                  height={30}
                  width={30}
                  alt="TupleAI Logo"
                  className="mx-auto rounded-full bg-red-200"
                />
                <span className="font-medium text-xl text-white">TupleAI</span>
              </Link>
              <div className="flex flex-col items-start space-y-4">
                <NavLink href="/features">Features</NavLink>
                <NavLink href="/how-it-works">How it Works</NavLink>
                <NavLink href="/examples">Examples</NavLink>
                {/* <NavLink href="/pricing">Pricing</NavLink> */}
              </div>
              <div className="flex flex-col items-start space-y-4">
                {!session ? (
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-white hover:text-purple-400"
                    >
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-white hover:text-purple-400"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                )}
                <Link href={session?.user ? "/dashboard" : "/login"}>
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.nav>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative text-gray-300 transition-colors hover:text-white"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  );
}
