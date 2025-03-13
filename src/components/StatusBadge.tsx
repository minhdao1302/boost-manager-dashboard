
import { cn } from "@/lib/utils";

type StatusType = "done" | "inprogress" | "pending" | "issue";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const defaultLabels = {
    done: "Done",
    inprogress: "In Progress",
    pending: "Pending",
    issue: "Issue",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        `status-${status}`,
        className
      )}
    >
      <span className={`mr-1 h-1.5 w-1.5 rounded-full bg-status-${status}`} />
      {label || defaultLabels[status]}
    </span>
  );
};
