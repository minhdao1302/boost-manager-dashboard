
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type ToastType = "default" | "destructive";

export interface ChatResponse {
  response: string;
  toastInfo?: {
    message: string;
    type: ToastType;
  }
}

export interface TouchpointResponse {
  touchpoint: string;
  response: string;
  showToast?: boolean;
  toastMessage?: string;
  toastType?: ToastType;
}

export type Touchpoint = 
  | 'morning-check-in'
  | 'supply-alert'
  | 'midday-review'
  | 'issue-resolution'
  | 'room-buying'
  | 'motivation'
  | 'pm-prep'
  | 'task-assignment'
  | 'progress-check'
  | 'eta-query'
  | 'pm-drop-list'
  | 'overtime-assessment'
  | 'overtime-assignment'
  | 'schedule-finalize'
  | 'pm-kickoff'
  | 'supply-check'
  | 'adjustment-query'
  | 'overtime-monitor'
  | 'wrap-up';
