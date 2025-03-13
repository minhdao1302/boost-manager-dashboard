
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
  color?: "primary" | "done" | "inprogress" | "pending" | "issue";
  size?: "sm" | "md" | "lg";
}

export const ProgressIndicator = ({
  value,
  max,
  className,
  showPercentage = false,
  color = "primary",
  size = "md",
}: ProgressIndicatorProps) => {
  const percentage = Math.round((value / max) * 100);
  
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    primary: "bg-primary",
    done: "bg-status-done",
    inprogress: "bg-status-inprogress",
    pending: "bg-status-pending",
    issue: "bg-status-issue",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div className={cn("w-full bg-secondary rounded-full overflow-hidden", sizeClasses[size])}>
          <div
            className={cn("transition-all duration-500 ease-out rounded-full", colorClasses[color], sizeClasses[size])}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showPercentage && (
          <div className="mt-1 text-xs text-muted-foreground">
            {percentage}% ({value}/{max})
          </div>
        )}
      </div>
    </div>
  );
};
