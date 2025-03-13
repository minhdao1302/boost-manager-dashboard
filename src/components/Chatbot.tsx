
import { useState, useEffect, useRef } from "react";
import { MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "./chat/types";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessageList } from "./chat/ChatMessageList";
import { useMessageProcessor } from "./chat/useMessageProcessor";

export const Chatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello Lisa, I'm your AI Coordinator. How can I assist you today? You can ask me about room status, assign tasks, or manage your team.",
      timestamp: new Date(),
    },
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { processUserMessage } = useMessageProcessor();

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Process user input
    processUserMessage(message).then(({ response }) => {
      // Add assistant message
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    });
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
          <ChatMessageList messages={messages} />

          {/* Input area */}
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
};
