import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg";
}

export function Spinner({
  className,
  size = "default",
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "default",
          "h-8 w-8": size === "lg",
        },
        className
      )}
      {...props}
    >
      <Loader2 className="h-full w-full animate-spin" />
    </div>
  );
}
