
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarPlus, ChevronDown } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";

interface Attendant {
  id: string;
  name: string;
  shift: string;
  roomsAssigned: number;
  roomsCompleted: number;
}

interface ShiftSectionProps {
  shift: string;
  time: string;
  attendants: Attendant[];
  overtimeWarning: string;
  onCreateSchedule: () => void;
  totalRooms: number;
  completedRooms: number;
}

export const ShiftSection = ({ 
  shift, 
  time,
  attendants, 
  overtimeWarning, 
  onCreateSchedule,
  totalRooms,
  completedRooms
}: ShiftSectionProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between mb-2 bg-white/50"
        >
          <div className="flex flex-col items-start">
            <span className="font-medium">{shift} Shift</span>
            <span className="text-sm text-muted-foreground">{time} • {attendants.length} RAs</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{completedRooms}/{totalRooms}</div>
            <div className="text-sm text-muted-foreground">Rooms completed</div>
          </div>
          
          <ProgressIndicator 
            value={completedRooms} 
            max={totalRooms}
            size="sm"
          />
          
          <div className={`text-sm p-2 rounded ${
            overtimeWarning.includes('Warning') 
              ? 'bg-status-issue/10 text-status-issue' 
              : 'bg-yellow-light/50 text-yellow-dark'
          }`}>
            {overtimeWarning || 'No overtime issues predicted'}
          </div>
          
          <Button 
            onClick={onCreateSchedule}
            className="w-full"
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
