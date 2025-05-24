"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface StatusIndicatorProps {
  status: "online" | "offline" | "maintenance" | "warning";
  isLoading?: boolean;
}

export function StatusIndicator({
  status,
  isLoading = false,
}: StatusIndicatorProps) {
  const getStatusDetails = () => {
    switch (status) {
      case "online":
        return {
          color: "bg-emerald-400",
          label: "System Online",
          description: "All systems operational",
        };
      case "offline":
        return {
          color: "bg-rose-400",
          label: "System Offline",
          description: "Service is currently unavailable",
        };
      case "maintenance":
        return {
          color: "bg-amber-400",
          label: "Maintenance",
          description: "Scheduled maintenance in progress",
        };
      case "warning":
        return {
          color: "bg-yellow-400",
          label: "Warning",
          description: "Some services experiencing issues",
        };
      default:
        return {
          color: "bg-slate-400",
          label: "Unknown",
          description: "Status unknown",
        };
    }
  };

  const { color, label, description } = getStatusDetails();

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1">
        <Skeleton className="h-2.5 w-2.5 rounded-full" />
        <Skeleton className="h-5 w-24" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-1.5 px-3 py-1">
            <motion.div
              className={`h-2.5 w-2.5 rounded-full ${color}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                repeatType: "loop",
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
            <Badge variant="outline" className="border-transparent text-white">
              <span className="font-medium">{label}</span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
