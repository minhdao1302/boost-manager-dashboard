
import { useState, useEffect } from "react";
import { RoomStatus } from "./RoomStatus";
import { ShiftOverview } from "./ShiftOverview";
import { IssueTracker } from "./IssueTracker";
import { PMSchedule } from "./PMSchedule";
import { Chatbot } from "./Chatbot";
import { RAPopup } from "./RAPopup";
import { ShiftSection } from "./ShiftSection";
import { toast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FilterX, Clock, Users, BarChart3, Sparkles } from "lucide-react";

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
  const [activeFilter, setActiveFilter] = useState("All");
  const [suggestions, setSuggestions] = useState([
    "Drop Room 205 to PM shift",
    "Assign Room 415 to Tom",
    "Check in with Sarah about progress"
  ]);
  const [aiPrimarySuggestion, setAiPrimarySuggestion] = useState("");

  useEffect(() => {
    // Simulate fetching AI primary suggestion
    const suggestion = "Assign Room 415 to Tom now";
    setAiPrimarySuggestion(suggestion);
  }, []);

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
      case 'adjust':
        toast({
          title: "Workload Adjustment",
          description: `Adjusting workload for ${ra.name}`,
        });
        // In a real implementation, you might open a modal for adjusting rooms
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

  const handleSuggestionClick = () => {
    toast({
      title: "Executing Suggestion",
      description: aiPrimarySuggestion,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Shift Control</h2>
          </div>
          
          <div className="inline-flex items-center rounded-md border border-input bg-white/60 backdrop-blur-sm">
            <Button 
              variant={activeFilter === "All" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setActiveFilter("All")}
              className="rounded-r-none"
            >
              All
            </Button>
            <Button 
              variant={activeFilter === "Done" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setActiveFilter("Done")}
              className="rounded-none"
            >
              Done
            </Button>
            <Button 
              variant={activeFilter === "In Progress" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setActiveFilter("In Progress")}
              className="rounded-none"
            >
              In Progress
            </Button>
            <Button 
              variant={activeFilter === "Pending" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setActiveFilter("Pending")}
              className="rounded-l-none"
            >
              Pending
            </Button>
          </div>
        </div>
        
        {aiPrimarySuggestion && (
          <Button 
            onClick={handleSuggestionClick}
            className="w-full flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-100 shadow-sm hover:from-blue-100 hover:to-purple-100"
          >
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">AI Recommendation</span>
            </div>
            <span>{aiPrimarySuggestion}</span>
          </Button>
        )}
        
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
            <Textarea 
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Enter your message here..."
              className="min-h-32"
            />
            <SheetFooter>
              <Button variant="secondary" onClick={() => setShowTextSheet(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendText}>
                Send Message
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
      
      <Chatbot />
    </div>
  );
};
