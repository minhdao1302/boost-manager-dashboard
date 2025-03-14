
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Building, ArrowDownToLine, Ban, StopCircle, Sparkles } from "lucide-react";

interface Room {
  roomNumber: string;
  status: "done" | "inprogress" | "pending" | "issue";
  attendant?: string;
  updatedAt?: string;
  issues?: { type: string, description: string }[];
  eta?: string;
  notes?: string;
}

interface RoomPopupProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string, room: Room) => void;
}

export const RoomPopup = ({ room, isOpen, onClose, onAction }: RoomPopupProps) => {
  if (!room) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Room {room.roomNumber}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => onAction('suggest', room)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <Sparkles className="h-4 w-4" />
              AI Suggestion
            </Button>
            <Button 
              onClick={() => onAction('drop', room)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Drop to PM
            </Button>
            <Button 
              onClick={() => onAction('block', room)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <Ban className="h-4 w-4" />
              Block Room
            </Button>
            <Button 
              onClick={() => onAction('stop', room)} 
              className="flex items-center justify-center gap-2"
              variant="outline"
            >
              <StopCircle className="h-4 w-4" />
              Stop Working
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="secondary">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
