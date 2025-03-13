
import { cn } from "@/lib/utils";
import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={cn(
        "flex max-w-[85%] animate-fade-in",
        message.role === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      <div
        className={cn(
          "rounded-lg p-3 text-sm",
          message.role === "user" 
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-white border border-border/20 rounded-bl-none"
        )}
      >
        {message.content}
        <div 
          className={cn(
            "text-xs mt-1",
            message.role === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};
