
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MessageSquare, Send, Flag, PlusCircle, BarChart3, Sliders } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

interface Attendant {
  id: string;
  name: string;
  shift: string;
  roomsAssigned: number;
  roomsCompleted: number;
  performance?: "ahead" | "ontrack" | "behind";
}

interface Progress {
  completed: number;
  current?: string;
}

interface RAPopupProps {
  ra: Attendant | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string, ra: Attendant) => void;
}

export const RAPopup = ({ ra, isOpen, onClose, onAction }: RAPopupProps) => {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  
  if (!ra) return null;
  
  const fetchProgress = () => {
    // Simulate fetching progress data
    setProgress({
      completed: ra.roomsCompleted,
      current: `Room ${Math.floor(Math.random() * 500) + 100}`
    });
    setShowProgressDetails(true);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Room Attendant: {ra.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => onAction('chat', ra)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <MessageSquare className="h-4 w-4" />
              Chat with AI
            </Button>
            <Button 
              onClick={() => onAction('text', ra)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <Send className="h-4 w-4" />
              Text RA
            </Button>
            <Button 
              onClick={() => onAction('flag', ra)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <Flag className="h-4 w-4" />
              Flag
            </Button>
            <Button 
              onClick={() => onAction('buy', ra)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <PlusCircle className="h-4 w-4" />
              Buy Room
            </Button>
            <Button 
              onClick={fetchProgress} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <BarChart3 className="h-4 w-4" />
              View Progress
            </Button>
            <Button 
              onClick={() => onAction('adjust', ra)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <Sliders className="h-4 w-4" />
              Adjust Workload
            </Button>
          </div>
          
          {showProgressDetails && progress && (
            <div className="bg-secondary/50 p-3 rounded-md space-y-2">
              <h4 className="text-sm font-medium">Progress Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Completed:</div>
                <div className="font-medium">{progress.completed} rooms</div>
                
                <div>Current:</div>
                <div className="font-medium">{progress.current || 'None'}</div>
                
                <div>Progress:</div>
                <div className="font-medium">{Math.round((progress.completed / ra.roomsAssigned) * 100)}%</div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="secondary">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
