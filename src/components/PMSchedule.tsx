
import { useState } from "react";
import { Clock, Check, Calendar, Users } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ProgressIndicator } from "./ProgressIndicator";
import { cn } from "@/lib/utils";

interface PMRoom {
  roomNumber: string;
  status: "todo" | "inprogress" | "done";
  notes?: string;
  assignedTo?: string;
}

// Mock data for demonstration
const mockPMRooms: PMRoom[] = [
  { roomNumber: "205", status: "todo", notes: "Needs linens" },
  { roomNumber: "207", status: "todo" },
  { roomNumber: "301", status: "todo", notes: "Deep clean" },
  { roomNumber: "305", status: "todo" },
  { roomNumber: "310", status: "todo" },
];

export const PMSchedule = () => {
  const [isFinalized, setIsFinalized] = useState(false);
  const [countdown, setCountdown] = useState("1h 45m");
  const deadline = "3:30 PM";
  
  // Get current time for formatting
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

  return (
    <div className="space-y-4 animate-fade-in bg-white/30 backdrop-blur-md rounded-xl p-4 border border-border/20 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">PM Schedule</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">Current: {currentTime}</div>
          {!isFinalized && (
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-status-inprogress/10 text-status-inprogress text-sm">
              <Clock className="h-3.5 w-3.5" />
              <span>{countdown} until deadline</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground">PM Schedule Deadline: <span className="font-medium text-foreground">{deadline}</span></p>
          <div className="flex items-center mt-1">
            <Users className="h-4 w-4 text-muted-foreground mr-1.5" />
            <span className="text-sm text-muted-foreground">4 PM Attendants available</span>
          </div>
        </div>
        
        {isFinalized ? (
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-status-done/10 text-status-done text-sm">
            <Check className="h-3.5 w-3.5" />
            <span>Schedule Finalized</span>
          </div>
        ) : (
          <button 
            onClick={() => setIsFinalized(true)}
            className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors"
          >
            Finalize Schedule
          </button>
        )}
      </div>

      {!isFinalized && (
        <div className="p-3 border border-status-inprogress/30 bg-status-inprogress/5 rounded-lg">
          <div className="flex items-center space-x-2 text-status-inprogress">
            <Clock className="h-4 w-4" />
            <span className="font-medium">AI Recommendation</span>
          </div>
          <p className="text-sm mt-1">Based on current progress, consider dropping rooms 205, 207, and 301 to PM shift.</p>
          <div className="mt-2 flex space-x-2">
            <button className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium transition-colors">
              Accept Suggestion
            </button>
            <button className="px-2.5 py-1 rounded-md border border-primary/20 text-primary hover:bg-primary/5 text-xs font-medium transition-colors">
              Modify
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">PM Rooms ({mockPMRooms.length})</h3>
          <button className="text-xs text-primary hover:underline">
            Optimize Distribution
          </button>
        </div>

        <div className="space-y-2">
          {mockPMRooms.map((room) => (
            <div
              key={room.roomNumber}
              className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-border/20"
            >
              <div>
                <div className="font-medium">Room {room.roomNumber}</div>
                {room.notes && (
                  <p className="text-xs text-muted-foreground">{room.notes}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {room.assignedTo ? (
                  <div className="text-sm">{room.assignedTo}</div>
                ) : (
                  <button className="px-2.5 py-1 rounded-md border border-primary/20 text-primary hover:bg-primary/5 text-xs font-medium transition-colors">
                    Assign
                  </button>
                )}
                <StatusBadge 
                  status={
                    room.status === "done" ? "done" : 
                    room.status === "inprogress" ? "inprogress" : 
                    "pending"
                  } 
                  label={
                    room.status === "done" ? "Done" : 
                    room.status === "inprogress" ? "In Progress" : 
                    "To Do"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button className="w-full py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors">
          {isFinalized ? "Modify PM Schedule" : "Add Room to PM Schedule"}
        </button>
      </div>
    </div>
  );
};
