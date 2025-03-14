
import { useState } from "react";
import { RoomStatusCard, RoomStatus as RoomStatusType } from "./RoomStatusCard";
import { ProgressIndicator } from "./ProgressIndicator";
import { LayoutGrid, ListFilter, LayoutList, Search, X } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

// Mock data for demonstration
const mockRooms = [
  { roomNumber: "101", status: "done", attendant: "Maria", updatedAt: "10:15 AM", notes: "All clean" },
  { roomNumber: "102", status: "done", attendant: "Tom", updatedAt: "10:30 AM" },
  { roomNumber: "103", status: "inprogress", attendant: "Sarah", updatedAt: "Just now", eta: "11:15 AM" },
  { roomNumber: "104", status: "pending" },
  { roomNumber: "105", status: "issue", attendant: "John", updatedAt: "9:45 AM", issues: [{ type: "supplies", description: "Needs towels" }] },
  { roomNumber: "201", status: "done", attendant: "Maria", updatedAt: "9:30 AM" },
  { roomNumber: "202", status: "done", attendant: "Tom", updatedAt: "9:45 AM" },
  { roomNumber: "203", status: "inprogress", attendant: "Sarah", updatedAt: "Just now", eta: "11:30 AM" },
  { roomNumber: "204", status: "pending" },
  { roomNumber: "205", status: "pending" },
  { roomNumber: "206", status: "issue", attendant: "Maria", updatedAt: "10:00 AM", issues: [{ type: "maintenance", description: "Broken lamp" }] },
];

interface RoomStatusProps {
  onRoomClick?: (room: any) => void;
}

export const RoomStatus = ({ onRoomClick }: RoomStatusProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<RoomStatusType | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter rooms based on status and search term
  const filteredRooms = mockRooms.filter((room) => {
    const matchesFilter = filter === "all" || room.status === filter;
    const matchesSearch = searchTerm === "" || 
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.attendant && room.attendant.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Count rooms by status
  const roomCounts = {
    all: mockRooms.length,
    done: mockRooms.filter(r => r.status === "done").length,
    inprogress: mockRooms.filter(r => r.status === "inprogress").length,
    pending: mockRooms.filter(r => r.status === "pending").length,
    issue: mockRooms.filter(r => r.status === "issue").length,
  };

  return (
    <div className="space-y-4 animate-fade-in bg-white/30 backdrop-blur-md rounded-xl p-4 border border-border/20 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Room Status</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              view === "grid" ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              view === "list" ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"
            )}
          >
            <LayoutList className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search room or attendant..."
            className="w-full pl-8 pr-8 py-1.5 rounded-md border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <ListFilter className="h-4 w-4 text-muted-foreground" />
        </div>
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
            filter === "all" ? "bg-primary/10 text-primary" : "hover:bg-secondary text-muted-foreground"
          )}
        >
          All ({roomCounts.all})
        </button>
        <button
          onClick={() => setFilter("done")}
          className={cn(
            "transition-colors",
            filter === "done" ? "bg-status-done/10 text-status-done" : "hover:bg-secondary text-muted-foreground"
          )}
        >
          <StatusBadge status="done" label={`Done (${roomCounts.done})`} />
        </button>
        <button
          onClick={() => setFilter("inprogress")}
          className={cn(
            "transition-colors",
            filter === "inprogress" ? "bg-status-inprogress/10 text-status-inprogress" : "hover:bg-secondary text-muted-foreground"
          )}
        >
          <StatusBadge status="inprogress" label={`In Progress (${roomCounts.inprogress})`} />
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={cn(
            "transition-colors",
            filter === "pending" ? "bg-status-pending/10 text-status-pending" : "hover:bg-secondary text-muted-foreground"
          )}
        >
          <StatusBadge status="pending" label={`Pending (${roomCounts.pending})`} />
        </button>
        <button
          onClick={() => setFilter("issue")}
          className={cn(
            "transition-colors",
            filter === "issue" ? "bg-status-issue/10 text-status-issue" : "hover:bg-secondary text-muted-foreground"
          )}
        >
          <StatusBadge status="issue" label={`Issues (${roomCounts.issue})`} />
        </button>
      </div>

      <ProgressIndicator 
        value={roomCounts.done} 
        max={roomCounts.all} 
        showPercentage
        color="done"
      />

      <div className={cn(
        "grid gap-3 mt-4",
        view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {filteredRooms.map((room) => (
          <div 
            key={room.roomNumber}
            onClick={() => onRoomClick && onRoomClick(room)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <RoomStatusCard
              roomNumber={room.roomNumber}
              status={room.status as RoomStatusType}
              attendant={room.attendant}
              updatedAt={room.updatedAt}
              notes={room.notes}
              issues={room.issues}
              eta={room.eta}
              className={cn(
                view === "list" ? "flex items-center justify-between" : ""
              )}
            />
          </div>
        ))}
        {filteredRooms.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No rooms match your filters
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
