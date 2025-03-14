
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarPlus, ChevronDown, BarChart, Clock, AlertCircle } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";
import { Slider } from "@/components/ui/slider";

interface Attendant {
  id: string;
  name: string;
  shift: string;
  roomsAssigned: number;
  roomsCompleted: number;
}

interface ShiftStats {
  done: number;
  pending: number;
  issues: number;
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
  const [stats, setStats] = useState<ShiftStats | null>(null);
  const [hours, setHours] = useState<number>(6); // Default shift length
  const [showStats, setShowStats] = useState(false);
  const [predictedOvertime, setPredictedOvertime] = useState("0h");
  
  useEffect(() => {
    // Simulate fetching AI-predicted overtime
    const calculateOvertime = () => {
      const capacity = attendants.length * 8; // 8 rooms per attendant
      const extraRooms = Math.max(0, totalRooms - capacity);
      const overtime = Math.ceil(extraRooms / (attendants.length * 1.33)); // 1.33 rooms/hour
      setPredictedOvertime(`${overtime}h`);
    };
    
    calculateOvertime();
  }, [attendants.length, totalRooms]);
  
  const fetchStats = () => {
    // Simulate fetching shift stats
    setStats({
      done: completedRooms,
      pending: totalRooms - completedRooms,
      issues: Math.floor(Math.random() * 3) // 0-2 random issues
    });
    setShowStats(true);
  };
  
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
          <div className="flex items-center gap-2">
            {parseInt(predictedOvertime) > 0 && (
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                parseInt(predictedOvertime) > 1 ? 'bg-status-issue/10 text-status-issue' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {predictedOvertime} overtime
              </span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
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
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={onCreateSchedule}
              className="w-full"
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Create Schedule
            </Button>
            
            <Button
              onClick={fetchStats}
              className="w-full"
              variant="secondary"
            >
              <BarChart className="mr-2 h-4 w-4" />
              View Shift Stats
            </Button>
          </div>
          
          {showStats && stats && (
            <div className="bg-secondary/30 p-3 rounded-md space-y-1 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="font-medium text-green-600">{stats.done}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="font-medium text-yellow-600">{stats.pending}</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div>
                  <div className="font-medium text-red-600">{stats.issues}</div>
                  <div className="text-xs text-muted-foreground">Issues</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Shift Hours:</span>
              </div>
              <span className="text-sm font-medium">{hours} hours</span>
            </div>
            
            <Slider
              min={4}
              max={8}
              step={0.5}
              value={[hours]}
              onValueChange={(values) => setHours(values[0])}
              className="w-full"
            />
          </div>
          
          <div className={`text-sm p-2 rounded flex items-center gap-2 ${
            parseInt(predictedOvertime) > 1
              ? 'bg-status-issue/10 text-status-issue' 
              : parseInt(predictedOvertime) > 0
                ? 'bg-yellow-light/50 text-yellow-dark'
                : 'bg-green-100 text-green-800'
          }`}>
            <AlertCircle className="h-4 w-4" />
            {parseInt(predictedOvertime) > 1
              ? `Warning: ${predictedOvertime} overtime likely with current workload`
              : parseInt(predictedOvertime) > 0
                ? `Light overtime possible: ${predictedOvertime}`
                : 'No overtime issues predicted'}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
