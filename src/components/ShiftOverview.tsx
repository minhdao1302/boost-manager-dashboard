
import { BarChart3, Users } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";
import { cn } from "@/lib/utils";

interface Attendant {
  id: string;
  name: string;
  avatar?: string;
  roomsAssigned: number;
  roomsCompleted: number;
  performance?: "ahead" | "ontrack" | "behind";
}

interface ShiftData {
  id: string;
  name: string;
  time: string;
  attendants: Attendant[];
  totalRooms: number;
  completedRooms: number;
}

// Mock data for demonstration
const mockShifts: ShiftData[] = [
  {
    id: "morning",
    name: "Morning",
    time: "8:00 AM",
    attendants: [
      { id: "1", name: "Maria", roomsAssigned: 15, roomsCompleted: 12, performance: "ahead" },
      { id: "2", name: "Tom", roomsAssigned: 15, roomsCompleted: 10, performance: "ontrack" },
      { id: "3", name: "Sarah", roomsAssigned: 15, roomsCompleted: 7, performance: "behind" },
      { id: "4", name: "John", roomsAssigned: 15, roomsCompleted: 11, performance: "ontrack" },
    ],
    totalRooms: 60,
    completedRooms: 40,
  },
  {
    id: "day",
    name: "Day",
    time: "9:00 AM",
    attendants: [
      { id: "5", name: "Lisa", roomsAssigned: 15, roomsCompleted: 8, performance: "ontrack" },
      { id: "6", name: "Alex", roomsAssigned: 15, roomsCompleted: 6, performance: "behind" },
      { id: "7", name: "Emma", roomsAssigned: 15, roomsCompleted: 9, performance: "ontrack" },
    ],
    totalRooms: 45,
    completedRooms: 23,
  },
  {
    id: "pm",
    name: "PM",
    time: "4:00 PM",
    attendants: [
      { id: "8", name: "David", roomsAssigned: 10, roomsCompleted: 0, performance: "ontrack" },
      { id: "9", name: "Nina", roomsAssigned: 10, roomsCompleted: 0, performance: "ontrack" },
    ],
    totalRooms: 20,
    completedRooms: 0,
  },
];

export const ShiftOverview = () => {
  return (
    <div className="space-y-4 animate-fade-in bg-white/30 backdrop-blur-md rounded-xl p-4 border border-border/20 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Shift Overview</h2>
        </div>
        <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
          <BarChart3 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {mockShifts.map((shift) => (
          <div key={shift.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{shift.name} Shift</h3>
                <p className="text-sm text-muted-foreground">{shift.time} • {shift.attendants.length} RAs</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{shift.completedRooms}/{shift.totalRooms}</div>
                <p className="text-xs text-muted-foreground">Rooms completed</p>
              </div>
            </div>

            <ProgressIndicator 
              value={shift.completedRooms} 
              max={shift.totalRooms}
              size="sm"
              color={shift.id === "pm" ? "pending" : "primary"}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {shift.attendants.slice(0, 4).map((attendant) => (
                <div 
                  key={attendant.id}
                  className="flex items-center justify-between p-2 bg-white/50 rounded-lg border border-border/20"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {attendant.name.charAt(0)}
                      </div>
                      {attendant.performance && (
                        <div className={cn(
                          "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border border-white",
                          attendant.performance === "ahead" ? "bg-status-done" :
                          attendant.performance === "behind" ? "bg-status-issue" :
                          "bg-status-inprogress"
                        )} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{attendant.name}</div>
                      <div className="text-xs text-muted-foreground">{attendant.roomsCompleted}/{attendant.roomsAssigned} rooms</div>
                    </div>
                  </div>
                  
                  <ProgressIndicator 
                    value={attendant.roomsCompleted} 
                    max={attendant.roomsAssigned}
                    size="sm"
                    className="w-16"
                    color={
                      attendant.performance === "ahead" ? "done" :
                      attendant.performance === "behind" ? "issue" :
                      "inprogress"
                    }
                  />
                </div>
              ))}
              
              {shift.attendants.length > 4 && (
                <button className="text-sm text-primary hover:text-primary/80 text-center">
                  View all {shift.attendants.length} attendants
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
