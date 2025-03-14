
import { useState } from "react";
import { RoomStatus } from "./RoomStatus";
import { ShiftOverview } from "./ShiftOverview";
import { IssueTracker } from "./IssueTracker";
import { PMSchedule } from "./PMSchedule";
import { Chatbot } from "./Chatbot";
import { RAPopup } from "./RAPopup";
import { ShiftSection } from "./ShiftSection";
import { toast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Attendant {
  id: string;
  name: string;
  shift: string;
  roomsAssigned: number;
  roomsCompleted: number;
  performance?: "ahead" | "ontrack" | "behind";
}

export const Dashboard = () => {
  const [selectedRA, setSelectedRA] = useState<Attendant | null>(null);
  const [showShiftOptions, setShowShiftOptions] = useState(false);
  const [overtimeWarning, setOvertimeWarning] = useState("Overtime Possibility Low");
  const [showTextSheet, setShowTextSheet] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  // Mock morning shift data
  const morningShift = {
    name: "Morning",
    time: "8:00 AM",
    attendants: [
      { id: "1", name: "Maria", shift: "8AM", roomsAssigned: 15, roomsCompleted: 12, performance: "ahead" },
      { id: "2", name: "Tom", shift: "8AM", roomsAssigned: 15, roomsCompleted: 10, performance: "ontrack" },
      { id: "3", name: "Sarah", shift: "8AM", roomsAssigned: 15, roomsCompleted: 7, performance: "behind" },
      { id: "4", name: "John", shift: "8AM", roomsAssigned: 15, roomsCompleted: 11, performance: "ontrack" },
    ],
    totalRooms: 60,
    completedRooms: 40,
  };

  const handleRAAction = (action: string, ra: Attendant) => {
    switch (action) {
      case 'chat':
        toast({
          title: "Chat with AI",
          description: `Opening AI chat about ${ra.name}`,
        });
        break;
      case 'text':
        setShowTextSheet(true);
        break;
      case 'flag':
        toast({
          title: "RA Flagged",
          description: `${ra.name} has been flagged for attention`,
          variant: "destructive"
        });
        break;
      case 'buy':
        toast({
          title: "Room Assignment",
          description: `${ra.name} has been assigned an additional room`,
        });
        break;
      default:
        break;
    }
  };

  const handleCreateSchedule = () => {
    toast({
      title: "Schedule Created",
      description: "Morning schedule has been created successfully",
    });
    setOvertimeWarning("Warning: Overtime Likely");
  };

  const handleSendText = () => {
    if (selectedRA && textMessage.trim()) {
      toast({
        title: "Message Sent",
        description: `Message sent to ${selectedRA.name}`,
      });
      setTextMessage("");
      setShowTextSheet(false);
    }
  };

  const handleAttendantClick = (attendant: Attendant) => {
    setSelectedRA(attendant);
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <div className="mb-4">
        <ShiftSection 
          shift={morningShift.name}
          time={morningShift.time}
          attendants={morningShift.attendants}
          overtimeWarning={overtimeWarning}
          onCreateSchedule={handleCreateSchedule}
          totalRooms={morningShift.totalRooms}
          completedRooms={morningShift.completedRooms}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RoomStatus />
          <IssueTracker />
        </div>
        <div className="space-y-6">
          <ShiftOverview onAttendantClick={handleAttendantClick} />
          <PMSchedule />
        </div>
      </div>
      
      <RAPopup 
        ra={selectedRA}
        isOpen={!!selectedRA}
        onClose={() => setSelectedRA(null)}
        onAction={handleRAAction}
      />
      
      <Sheet open={showTextSheet} onOpenChange={setShowTextSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Text {selectedRA?.name}</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <textarea 
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Enter your message here..."
              className="w-full h-32 p-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowTextSheet(false)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendText}
                className="px-4 py-2 bg-primary text-primary-foreground rounded"
              >
                Send Message
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <Chatbot />
    </div>
  );
};
