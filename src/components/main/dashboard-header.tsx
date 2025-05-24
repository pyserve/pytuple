"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type React from "react";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  backHref?: string;
}

export function DashboardHeader({
  heading,
  text,
  children,
  backHref,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <div className="flex items-center">
        {backHref && (
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="mr-2 rounded-full"
          >
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
        )}
        <div className="flex-1">
          <motion.h1
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {heading}
          </motion.h1>
          {text && (
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {text}
            </motion.p>
          )}
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
