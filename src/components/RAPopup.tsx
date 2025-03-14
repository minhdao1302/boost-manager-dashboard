
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MessageSquare, Send, Flag, PlusCircle } from "lucide-react";

interface Attendant {
  id: string;
  name: string;
  shift: string;
  roomsAssigned: number;
  roomsCompleted: number;
  performance?: "ahead" | "ontrack" | "behind";
}

interface RAPopupProps {
  ra: Attendant | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string, ra: Attendant) => void;
}

export const RAPopup = ({ ra, isOpen, onClose, onAction }: RAPopupProps) => {
  if (!ra) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Room Attendant: {ra.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
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
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="secondary">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
