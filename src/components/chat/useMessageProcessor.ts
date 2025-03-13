
import { useState } from "react";
import { Message, ToastType } from "./types";
import { toast } from "@/hooks/use-toast";

interface ProcessedResponse {
  response: string;
  toastInfo?: {
    message: string;
    type: ToastType;
  }
}

export const useMessageProcessor = () => {
  const processUserMessage = (message: string): Promise<ProcessedResponse> => {
    return new Promise((resolve) => {
      const lowerMessage = message.toLowerCase();
      let response = "";
      let shouldShowToast = false;
      let toastMessage = "";
      let toastType: ToastType = "default";
      
      // Morning Check-In
      if (lowerMessage.includes("floor 2 status") || lowerMessage.includes("show me floor 2")) {
        response = "Floor 2 status: 8 rooms done, 5 in progress, 3 pending. Maria and Tom are working on this floor.";
      } 
      // Supply Alert
      else if (lowerMessage.includes("send") && lowerMessage.includes("towels") && lowerMessage.includes("floor")) {
        response = "Order logged. 20 towels will be sent to Floor 2. Do you want me to notify the housekeeping attendants?";
        shouldShowToast = true;
        toastMessage = "Supply order logged and sent to procurement";
        toastType = "default";
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
        toastType = "default";
      } 
      // Room Buying
      else if (lowerMessage.includes("bought room") || (lowerMessage.includes("maria") && lowerMessage.includes("215"))) {
        response = "Confirmed! Maria has picked up Room 215. I've updated her schedule and sent a notification. Would you like me to send a congratulatory message?";
        shouldShowToast = true;
        toastMessage = "Room 215 reassigned to Maria";
        toastType = "default";
      } 
      // Good job message
      else if (lowerMessage.includes("good job") || lowerMessage.includes("well done")) {
        const attendant = lowerMessage.includes("maria") ? "Maria" : lowerMessage.includes("tom") ? "Tom" : lowerMessage.includes("sarah") ? "Sarah" : "team";
        response = `Message sent to ${attendant}: "Great work today! Keep it up!"`;
        shouldShowToast = true;
        toastMessage = `Motivational message sent to ${attendant}`;
        toastType = "default";
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
        toastType = "default";
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
        toastType = "default";
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
        toastType = "default";
      }
      // Schedule Finalize
      else if (lowerMessage.includes("finalize pm") || lowerMessage.includes("finalize schedule")) {
        response = "PM schedule has been finalized and distributed to all PM attendants. David and Nina have confirmed receipt and will start at 4:00 PM with rooms 205, 207, 301, 305, and 310.";
        shouldShowToast = true;
        toastMessage = "PM schedule finalized and distributed";
        toastType = "default";
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
        toastType = "default";
      }
      // Fallback responses
      else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        response = "Hello! How can I help you manage the housekeeping team today?";
      } else if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
        response = "You're welcome! Is there anything else you need assistance with?";
      } else {
        response = "I understand your message. How would you like me to help with that? You can ask about room status, assign tasks, manage PM schedules, or check on your team.";
      }

      // Simulate delay for a more realistic feel (600-1000ms)
      setTimeout(() => {
        if (shouldShowToast) {
          toast({
            title: toastType === "default" ? "Success" : "Warning",
            description: toastMessage,
            variant: toastType,
          });
        }
        
        resolve({
          response,
          ...(shouldShowToast && { 
            toastInfo: { 
              message: toastMessage, 
              type: toastType 
            } 
          })
        });
      }, Math.floor(Math.random() * 400) + 600);
    });
  };

  return { processUserMessage };
};
