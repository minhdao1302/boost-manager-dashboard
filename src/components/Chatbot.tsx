
import { useState, useEffect, useRef } from "react";
import { Send, ChevronUp, MessageSquare, Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello Lisa, I'm your AI Coordinator. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isExpanded]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      // Simple response logic based on message content
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
        response = "Hello! How can I help you today?";
      } else if (lowercaseInput.includes("room status") || lowercaseInput.includes("how many rooms")) {
        response = "Currently, we have 40 rooms completed, 15 in progress, and 35 pending.";
      } else if (lowercaseInput.includes("suggest pm") || lowercaseInput.includes("pm drop")) {
        response = "Based on current progress, I recommend dropping rooms 205, 207, and 301 to the PM shift. Would you like me to prepare that schedule?";
      } else if (lowercaseInput.includes("overtime")) {
        response = "Tom and Sarah are available for overtime today. Based on their performance, I recommend assigning rooms 415-419 to Tom and 501-505 to Sarah.";
      } else if (lowercaseInput.includes("floor")) {
        response = "Floor 2 status: 8 rooms done, 5 in progress, 3 pending. Maria and Tom are working on this floor.";
      } else {
        response = "I understand. How would you like me to help with that?";
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Toggle chat expansion
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 transition-all duration-300 ease-out",
      isExpanded ? "w-80 h-[400px] sm:w-96 sm:h-[500px]" : "w-auto h-auto"
    )}>
      {/* Collapsed button */}
      {!isExpanded && (
        <button
          onClick={toggleExpansion}
          className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all duration-300 animate-fade-in"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Expanded chat interface */}
      {isExpanded && (
        <div className="flex flex-col h-full rounded-lg glass border border-border/40 shadow-lg overflow-hidden animate-slide-in">
          {/* Chat header */}
          <div className="flex items-center justify-between p-3 border-b border-border/20 bg-white/70">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">AI Coordinator</h3>
                <p className="text-xs text-muted-foreground">Always available to help</p>
              </div>
            </div>
            <button 
              onClick={toggleExpansion}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-secondary/30">
            {messages.map((message) => (
              <div 
                key={message.id}
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
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
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
        </div>
      )}
    </div>
  );
};
