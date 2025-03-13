
import { Send, Mic } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    onSendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-border/20 bg-white/70">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className="w-full py-2 px-3 pr-10 rounded-full border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
        <button 
          type="submit"
          disabled={input.trim() === ""}
          className={cn(
            "h-9 w-9 rounded-full flex items-center justify-center transition-colors",
            input.trim() === "" 
              ? "bg-muted text-muted-foreground" 
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};
