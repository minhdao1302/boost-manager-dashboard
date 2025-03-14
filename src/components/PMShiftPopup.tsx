
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MessageSquare, Clock, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface PMShiftPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string, shift: string, data?: any) => void;
}

export const PMShiftPopup = ({ isOpen, onClose, onAction }: PMShiftPopupProps) => {
  const [subAction, setSubAction] = useState<string | null>(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [etaTime, setEtaTime] = useState("");
  
  const handleModifyAction = (action: string) => {
    setSubAction(action);
  };
  
  const handleSubmit = () => {
    if (subAction === 'add' && roomNumber) {
      onAction('modify', 'PM', { subAction, roomNumber });
      setRoomNumber("");
      setSubAction(null);
    } else if (subAction === 'remove' && roomNumber) {
      onAction('modify', 'PM', { subAction, roomNumber });
      setRoomNumber("");
      setSubAction(null);
    } else if (subAction === 'eta' && etaTime) {
      onAction('modify', 'PM', { subAction, etaTime });
      setEtaTime("");
      setSubAction(null);
    } else {
      toast({
        title: "Input required",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>PM Shift</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!subAction ? (
            <div className="grid grid-cols-1 gap-4">
              <Button 
                onClick={() => onAction('chat', 'PM')} 
                className="flex items-center justify-center gap-2"
                variant="outline"
              >
                <MessageSquare className="h-4 w-4" />
                Chat with Boost
              </Button>
              <div className="space-y-2">
                <p className="text-sm font-medium">Modify PM Schedule:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    onClick={() => handleModifyAction('add')} 
                    className="flex items-center justify-center gap-2"
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                    Add Room
                  </Button>
                  <Button 
                    onClick={() => handleModifyAction('remove')} 
                    className="flex items-center justify-center gap-2"
                    variant="outline"
                    size="sm"
                  >
                    <Minus className="h-4 w-4" />
                    Remove Room
                  </Button>
                  <Button 
                    onClick={() => handleModifyAction('eta')} 
                    className="flex items-center justify-center gap-2"
                    variant="outline"
                    size="sm"
                  >
                    <Clock className="h-4 w-4" />
                    Adjust ETA
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {subAction === 'add' && (
                <>
                  <p className="text-sm font-medium">Add room to PM schedule</p>
                  <Input 
                    placeholder="Enter room number" 
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </>
              )}
              
              {subAction === 'remove' && (
                <>
                  <p className="text-sm font-medium">Remove room from PM schedule</p>
                  <Input 
                    placeholder="Enter room number" 
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </>
              )}
              
              {subAction === 'eta' && (
                <>
                  <p className="text-sm font-medium">Adjust PM ETA</p>
                  <Input 
                    placeholder="Enter new ETA (e.g., 5:30 PM)" 
                    value={etaTime}
                    onChange={(e) => setEtaTime(e.target.value)}
                  />
                </>
              )}
              
              <div className="flex space-x-2">
                <Button 
                  onClick={() => setSubAction(null)}
                  variant="outline"
                >
                  Back
                </Button>
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
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
