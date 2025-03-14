import React from "react";
import { Clock, Users, ArrowRight } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";
import { Button } from "@/components/ui/button";

interface PMScheduleProps {
  onPMClick?: () => void;
}

export const PMSchedule = ({ onPMClick }: PMScheduleProps) => {
  // Mock PM shift data
  const pmShift = {
    name: "PM",
    time: "4:00 PM - 10:00 PM",
    attendants: [
      { id: "8", name: "David", shift: "4PM", roomsAssigned: 10, roomsCompleted: 0 },
      { id: "9", name: "Nina", shift: "4PM", roomsAssigned: 10, roomsCompleted: 0 },
    ],
    droppedRooms: [
      { roomNumber: "205", reason: "Special request" },
      { roomNumber: "207", reason: "Deep clean" },
      { roomNumber: "301", reason: "Maintenance issue" },
    ],
    totalRooms: 20,
    completedRooms: 0,
  };

  return (
    <div 
      className="space-y-4 animate-fade-in bg-white/30 backdrop-blur-md rounded-xl p-4 border border-border/20 shadow-sm cursor-pointer"
      onClick={onPMClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">PM Schedule</h2>
        </div>
        <span className="text-sm text-muted-foreground">{pmShift.time}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{pmShift.attendants.length} Room Attendants</span>
          </div>
          <span className="text-sm font-medium">{pmShift.totalRooms} rooms</span>
        </div>

        <ProgressIndicator 
          value={pmShift.completedRooms} 
          max={pmShift.totalRooms}
          size="sm"
          color="pending"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Dropped Rooms</h3>
        <div className="grid grid-cols-1 gap-2">
          {pmShift.droppedRooms.map((room) => (
            <div 
              key={room.roomNumber}
              className="flex items-center justify-between p-2 bg-white/50 rounded-lg border border-border/20"
            >
              <div>
                <div className="font-medium">Room {room.roomNumber}</div>
                <div className="text-xs text-muted-foreground">{room.reason}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          onPMClick && onPMClick();
        }}
      >
        Manage PM Schedule
      </Button>
    </div>
  );
};
