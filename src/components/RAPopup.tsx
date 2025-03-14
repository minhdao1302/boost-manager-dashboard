
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MessageSquare, Send, Flag, PlusCircle, BarChart3, Sliders, ChevronDown } from "lucide-react";
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
  const [aiAction, setAiAction] = useState("");
  const [showAllOptions, setShowAllOptions] = useState(true);
  
  useEffect(() => {
    if (ra) {
      // Simulate fetching AI-recommended action
      setTimeout(() => {
        const actions = ["chat", "text", "flag", "buy"];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const roomNumber = Math.floor(Math.random() * 500) + 100;
        
        if (randomAction === "buy") {
          setAiAction(`Buy Room ${roomNumber}`);
        } else if (randomAction === "chat") {
          setAiAction("Chat with AI");
        } else if (randomAction === "text") {
          setAiAction("Text RA");
        } else {
          setAiAction("Flag for attention");
        }
      }, 300);
    }
  }, [ra]);
  
  if (!ra) return null;
  
  const fetchProgress = () => {
    // Simulate fetching progress data
    setProgress({
      completed: ra.roomsCompleted,
      current: `Room ${Math.floor(Math.random() * 500) + 100}`
    });
    setShowProgressDetails(true);
  };

  const handleAiAction = () => {
    if (aiAction.startsWith("Buy Room")) {
      onAction('buy', ra);
    } else if (aiAction === "Chat with AI") {
      onAction('chat', ra);
    } else if (aiAction === "Text RA") {
      onAction('text', ra);
    } else if (aiAction === "Flag for attention") {
      onAction('flag', ra);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Room Attendant: {ra.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {aiAction && (
            <div className="bg-primary/10 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">AI Recommendation</h4>
              <Button 
                onClick={handleAiAction}
                className="w-full"
              >
                {aiAction}
              </Button>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">All options</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAllOptions(!showAllOptions)}
              className="h-8 w-8 p-0"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showAllOptions ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {showAllOptions && (
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
          )}
          
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
