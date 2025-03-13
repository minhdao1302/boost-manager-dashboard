
import { useState } from "react";
import { MoreHorizontal, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

export type RoomStatus = "done" | "inprogress" | "pending" | "issue";

interface RoomIssue {
  type: string;
  description: string;
}

interface RoomStatusCardProps {
  roomNumber: string;
  status: RoomStatus;
  attendant?: string;
  updatedAt?: string;
  notes?: string;
  issues?: RoomIssue[];
  eta?: string;
  className?: string;
  onClick?: () => void;
}

export const RoomStatusCard = ({
  roomNumber,
  status,
  attendant,
  updatedAt,
  notes,
  issues = [],
  eta,
  className,
  onClick,
}: RoomStatusCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusIcons = {
    done: <CheckCircle className="h-4 w-4 text-status-done" />,
    inprogress: <Clock className="h-4 w-4 text-status-inprogress" />,
    pending: <Clock className="h-4 w-4 text-status-pending" />,
    issue: <AlertTriangle className="h-4 w-4 text-status-issue" />,
  };

  return (
    <div
      className={cn(
        "glass rounded-lg p-3 transition-all duration-300 border border-border/30",
        status === "issue" ? "border-status-issue/30" : "",
        isHovered ? "translate-y-[-2px] shadow-md" : "shadow-sm",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium text-foreground">{roomNumber}</div>
        <div className="flex space-x-1 items-center">
          <StatusBadge status={status} />
          <button className="h-7 w-7 rounded-full inline-flex items-center justify-center hover:bg-muted transition-colors">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {attendant && (
        <div className="text-sm text-muted-foreground mb-1 flex items-center">
          <span className="font-medium">{attendant}</span>
          {updatedAt && <span className="ml-1 text-xs">• {updatedAt}</span>}
        </div>
      )}

      {notes && (
        <div className="text-sm text-foreground mb-2 line-clamp-2">{notes}</div>
      )}

      {issues.length > 0 && (
        <div className="mb-2">
          {issues.map((issue, i) => (
            <div key={i} className="flex items-start space-x-1 text-xs text-status-issue">
              <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>{issue.description}</span>
            </div>
          ))}
        </div>
      )}

      {eta && status === "inprogress" && (
        <div className="text-xs text-status-inprogress mt-1">
          <span className="font-medium">ETA:</span> {eta}
        </div>
      )}
    </div>
  );
};
