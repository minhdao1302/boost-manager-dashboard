
import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type IssueType = "maintenance" | "supplies" | "other";
type IssueStatus = "new" | "inprogress" | "resolved";

interface Issue {
  id: string;
  room: string;
  type: IssueType;
  description: string;
  status: IssueStatus;
  reportedAt: string;
  reportedBy: string;
}

// Mock data for demonstration
const mockIssues: Issue[] = [
  { 
    id: "1", 
    room: "105", 
    type: "supplies", 
    description: "Needs more towels", 
    status: "new", 
    reportedAt: "10:15 AM", 
    reportedBy: "John" 
  },
  { 
    id: "2", 
    room: "206", 
    type: "maintenance", 
    description: "Broken lamp", 
    status: "inprogress", 
    reportedAt: "9:30 AM", 
    reportedBy: "Maria" 
  },
  { 
    id: "3", 
    room: "312", 
    type: "maintenance", 
    description: "TV remote not working", 
    status: "resolved", 
    reportedAt: "Yesterday", 
    reportedBy: "Tom" 
  },
  { 
    id: "4", 
    room: "201", 
    type: "supplies", 
    description: "Floor 2 low on cleaning supplies", 
    status: "new", 
    reportedAt: "10:30 AM", 
    reportedBy: "Sarah" 
  },
];

export const IssueTracker = () => {
  const [filter, setFilter] = useState<IssueStatus | "all">("all");
  
  const filteredIssues = mockIssues.filter(
    issue => filter === "all" || issue.status === filter
  );

  const issueCounts = {
    all: mockIssues.length,
    new: mockIssues.filter(i => i.status === "new").length,
    inprogress: mockIssues.filter(i => i.status === "inprogress").length,
    resolved: mockIssues.filter(i => i.status === "resolved").length,
  };

  const getTypeIcon = (type: IssueType) => {
    switch (type) {
      case "maintenance":
        return <span className="text-primary">🔧</span>;
      case "supplies":
        return <span className="text-primary">🧹</span>;
      default:
        return <span className="text-primary">❗</span>;
    }
  };

  const getStatusIcon = (status: IssueStatus) => {
    switch (status) {
      case "new":
        return <AlertTriangle className="h-4 w-4 text-status-issue" />;
      case "inprogress":
        return <Clock className="h-4 w-4 text-status-inprogress" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-status-done" />;
    }
  };

  const getStatusClass = (status: IssueStatus) => {
    switch (status) {
      case "new":
        return "bg-status-issue/10 text-status-issue";
      case "inprogress":
        return "bg-status-inprogress/10 text-status-inprogress";
      case "resolved":
        return "bg-status-done/10 text-status-done";
    }
  };

  return (
    <div className="space-y-4 animate-fade-in bg-white/30 backdrop-blur-md rounded-xl p-4 border border-border/20 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-status-issue" />
          <h2 className="text-lg font-medium">Issue Tracker</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setFilter("all")}
            className={cn(
              "px-2 py-0.5 rounded text-xs font-medium",
              filter === "all" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
            )}
          >
            All ({issueCounts.all})
          </button>
          <button 
            onClick={() => setFilter("new")}
            className={cn(
              "px-2 py-0.5 rounded text-xs font-medium",
              filter === "new" ? "bg-status-issue/10 text-status-issue" : "text-muted-foreground hover:bg-secondary"
            )}
          >
            New ({issueCounts.new})
          </button>
          <button 
            onClick={() => setFilter("inprogress")}
            className={cn(
              "px-2 py-0.5 rounded text-xs font-medium",
              filter === "inprogress" ? "bg-status-inprogress/10 text-status-inprogress" : "text-muted-foreground hover:bg-secondary"
            )}
          >
            In Progress ({issueCounts.inprogress})
          </button>
          <button 
            onClick={() => setFilter("resolved")}
            className={cn(
              "px-2 py-0.5 rounded text-xs font-medium",
              filter === "resolved" ? "bg-status-done/10 text-status-done" : "text-muted-foreground hover:bg-secondary"
            )}
          >
            Resolved ({issueCounts.resolved})
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <div 
              key={issue.id}
              className="flex items-start justify-between p-3 bg-white/50 rounded-lg border border-border/20 transition-all hover:border-primary/30"
            >
              <div className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-lg bg-white border border-border flex items-center justify-center">
                    {getTypeIcon(issue.type)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Room {issue.room}</span>
                    <span className={cn(
                      "inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium",
                      getStatusClass(issue.status)
                    )}>
                      {getStatusIcon(issue.status)}
                      <span className="ml-1">
                        {issue.status === "new" ? "New" : 
                         issue.status === "inprogress" ? "In Progress" : "Resolved"}
                      </span>
                    </span>
                  </div>
                  <p className="text-sm">{issue.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reported by {issue.reportedBy} • {issue.reportedAt}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-1">
                <button className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 text-xs font-medium">
                  Assign
                </button>
                {issue.type === "supplies" && (
                  <button className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 text-xs font-medium whitespace-nowrap">
                    Order Supplies
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No issues match your filter
          </div>
        )}
      </div>

      <button className="w-full py-2 rounded-md border border-primary/20 text-primary hover:bg-primary/5 text-sm font-medium transition-colors">
        Report New Issue
      </button>
    </div>
  );
};
