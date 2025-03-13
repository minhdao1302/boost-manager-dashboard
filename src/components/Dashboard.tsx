
import { useState } from "react";
import { RoomStatus } from "./RoomStatus";
import { ShiftOverview } from "./ShiftOverview";
import { IssueTracker } from "./IssueTracker";
import { PMSchedule } from "./PMSchedule";
import { Chatbot } from "./Chatbot";

export const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RoomStatus />
          <IssueTracker />
        </div>
        <div className="space-y-6">
          <ShiftOverview />
          <PMSchedule />
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
};
