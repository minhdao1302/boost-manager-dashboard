
import { useState, useEffect, useRef } from "react";
import { Send, ChevronUp, MessageSquare, Mic, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

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

    // Process user input
    processUserMessage(input);
  };

  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Simulate AI response with 600-1000ms delay for realism
    setTimeout(() => {
      let response = "";
      let shouldShowToast = false;
      let toastMessage = "";
      let toastType: "success" | "info" | "warning" = "info";
      
      // Morning Check-In
      if (lowerMessage.includes("floor 2 status") || lowerMessage.includes("show me floor 2")) {
        response = "Floor 2 status: 8 rooms done, 5 in progress, 3 pending. Maria and Tom are working on this floor.";
      } 
      // Supply Alert
      else if (lowerMessage.includes("send") && lowerMessage.includes("towels") && lowerMessage.includes("floor")) {
        response = "Order logged. 20 towels will be sent to Floor 2. Do you want me to notify the housekeeping attendants?";
        shouldShowToast = true;
        toastMessage = "Supply order logged and sent to procurement";
        toastType = "success";
      } 
      // Midday Review
      else if (lowerMessage.includes("how many rooms done") || lowerMessage.includes("rooms completed")) {
        response = "Currently, we have 80 rooms done, 40 in progress, and 80 pending. We're at 40% completion rate, which is 5% ahead of yesterday at this time.";
      } 
      // Issue Resolution
      else if (lowerMessage.includes("assign maintenance") || (lowerMessage.includes("assign") && lowerMessage.includes("210"))) {
        response = "Maintenance request for Room 210 has been queued. John from maintenance has been notified and will attend within 30 minutes.";
        shouldShowToast = true;
        toastMessage = "Maintenance assigned to Room 210";
        toastType = "success";
      } 
      // Room Buying
      else if (lowerMessage.includes("bought room") || (lowerMessage.includes("maria") && lowerMessage.includes("215"))) {
        response = "Confirmed! Maria has picked up Room 215. I've updated her schedule and sent a notification. Would you like me to send a congratulatory message?";
        shouldShowToast = true;
        toastMessage = "Room 215 reassigned to Maria";
        toastType = "info";
      } 
      // Good job message
      else if (lowerMessage.includes("good job") || lowerMessage.includes("well done")) {
        const attendant = lowerMessage.includes("maria") ? "Maria" : lowerMessage.includes("tom") ? "Tom" : lowerMessage.includes("sarah") ? "Sarah" : "team";
        response = `Message sent to ${attendant}: "Great work today! Keep it up!"`;
        shouldShowToast = true;
        toastMessage = `Motivational message sent to ${attendant}`;
        toastType = "success";
      }
      // PM Prep
      else if (lowerMessage.includes("suggest pm") || lowerMessage.includes("pm drop list")) {
        response = "Based on current progress, I recommend dropping rooms 205, 207, and 301 to the PM shift. These rooms need special attention: 205 (linens), 301 (deep clean). Would you like to review the full PM schedule draft?";
      }
      // Room Buying Push
      else if ((lowerMessage.includes("assign") && lowerMessage.includes("sarah")) || (lowerMessage.includes("assign") && lowerMessage.includes("310"))) {
        response = "Room 310 has been assigned to Sarah. I've updated her schedule and sent a notification. She has confirmed receipt and estimates completion by 3:45 PM.";
        shouldShowToast = true;
        toastMessage = "Room 310 assigned to Sarah";
        toastType = "success";
      }
      // Progress Check
      else if (lowerMessage.includes("update on 9") || lowerMessage.includes("9 am ras")) {
        response = "9 AM shift update: 90 rooms done, 15 in progress. Attendants: Lisa (15/15), Alex (12/15), Emma (13/15). They're collectively 7% ahead of schedule.";
      }
      // ETA Query
      else if (lowerMessage.includes("eta") || lowerMessage.includes("how long")) {
        response = "Current ETAs for in-progress rooms: Floor 2 (3:30 PM), Floor 3 (3:45 PM), Floor 4 (3:40 PM). Overall completion estimate is 3:45 PM.";
      }
      // PM Drop List
      else if (lowerMessage.includes("approve pm drop") || (lowerMessage.includes("drop") && lowerMessage.includes("205"))) {
        response = "PM drop list for rooms 205 and 207 has been approved and locked in. I've notified the PM team lead who confirmed receipt. The PM schedule is now ready to be finalized.";
        shouldShowToast = true;
        toastMessage = "PM drop list approved for rooms 205 and 207";
        toastType = "success";
      }
      // Overtime Assessment
      else if (lowerMessage.includes("what's left") || lowerMessage.includes("after pm drop")) {
        response = "After PM drop, we have 20 rooms pending: 10 on Floor 4 and 10 on Floor 5. Estimated completion time with current staffing is 5:30 PM. Would you like to approve overtime?";
      }
      // Overtime Assignment
      else if (lowerMessage.includes("approve overtime") || (lowerMessage.includes("overtime") && (lowerMessage.includes("tom") || lowerMessage.includes("sarah")))) {
        response = "Overtime approved for Tom (Rooms 415-419) and Sarah (Rooms 501-505). They have confirmed availability and will stay until approximately 5:30 PM. Estimated additional cost: $85.";
        shouldShowToast = true;
        toastMessage = "Overtime approved for Tom and Sarah";
        toastType = "success";
      }
      // Schedule Finalize
      else if (lowerMessage.includes("finalize pm") || lowerMessage.includes("finalize schedule")) {
        response = "PM schedule has been finalized and distributed to all PM attendants. David and Nina have confirmed receipt and will start at 4:00 PM with rooms 205, 207, 301, 305, and 310.";
        shouldShowToast = true;
        toastMessage = "PM schedule finalized and distributed";
        toastType = "success";
      }
      // PM Kickoff
      else if (lowerMessage.includes("notify pm") || lowerMessage.includes("alert pm ras")) {
        response = "All PM RAs have been notified and have acknowledged their assignments. David and Nina are preparing to start their shift. Would you like me to send any specific instructions?";
      }
      // Supply Check
      else if (lowerMessage.includes("confirm with pm") || lowerMessage.includes("pm supplies")) {
        response = "PM team confirms they have all necessary supplies including extra linens for Room 205. All required supplies have been stocked in the housekeeping closets on floors 2 and 3.";
      }
      // Adjustment Query
      else if (lowerMessage.includes("delays") || lowerMessage.includes("any issues")) {
        response = "No delays reported. All RAs are on schedule. Tom is ahead by 1 room. Sarah is on target. Current ETA for completion is 5:00 PM.";
      }
      // Overtime Monitor
      else if (lowerMessage.includes("overtime status") || lowerMessage.includes("ot update")) {
        response = "Overtime status: Tom has completed 3/5 rooms (415-417), currently working on 418. Sarah has completed 2/5 rooms (501-502), currently working on 503. Both are on track to finish by 5:40 PM.";
      }
      // Wrap-Up
      else if (lowerMessage.includes("all rooms done") || lowerMessage.includes("completion status")) {
        response = "Excellent news! All 200 rooms have been completed. Final completion time: 5:45 PM. Would you like me to generate an end-of-day report with efficiency metrics?";
        shouldShowToast = true;
        toastMessage = "All 200 rooms completed successfully!";
        toastType = "success";
      }
      // Fallback responses
      else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        response = "Hello! How can I help you manage the housekeeping team today?";
      } else if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
        response = "You're welcome! Is there anything else you need assistance with?";
      } else {
        response = "I understand your message. How would you like me to help with that? You can ask about room status, assign tasks, manage PM schedules, or check on your team.";
      }

      // Add assistant message
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Show toast notification if needed
      if (shouldShowToast) {
        toast({
          title: toastType === "success" ? "Success" : toastType === "warning" ? "Warning" : "Information",
          description: toastMessage,
          variant: toastType === "success" ? "default" : toastType === "warning" ? "destructive" : "default",
        });
      }
    }, Math.floor(Math.random() * 400) + 600); // Random delay between 600-1000ms
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
