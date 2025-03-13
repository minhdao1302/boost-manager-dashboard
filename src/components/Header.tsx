
import { useState } from "react";
import { Bell, User, Menu, X, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  message: string;
  time: string;
  isRead: boolean;
}

// Mock data for notifications
const mockNotifications: Notification[] = [
  { id: "1", message: "Room 205 needs towels", time: "Just now", isRead: false },
  { id: "2", message: "PM schedule needs to be finalized by 3:30 PM", time: "10 min ago", isRead: false },
  { id: "3", message: "Maria has completed all assigned rooms", time: "30 min ago", isRead: true },
  { id: "4", message: "Supply order has been delivered", time: "1 hour ago", isRead: true },
];

export const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  // Get current time for display
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-border/20 shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <button 
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary mr-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              BM
            </div>
            <div>
              <h1 className="text-lg font-bold">Boost Manager</h1>
              <p className="text-xs text-muted-foreground">Current time: {currentTime}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full relative hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-status-issue text-white text-xs flex items-center justify-center font-medium animate-pulse-subtle">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass border border-border/20 shadow-lg rounded-md overflow-hidden animate-fade-in">
                <div className="p-3 border-b border-border/20 flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={cn(
                            "p-3 border-b border-border/10 hover:bg-secondary/50 cursor-pointer",
                            !notification.isRead && "bg-primary/5"
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <p className={cn(
                              "text-sm mr-4",
                              !notification.isRead && "font-medium"
                            )}>
                              {notification.message}
                            </p>
                            {!notification.isRead && (
                              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-border/20 bg-secondary/30">
                  <button className="w-full text-center text-xs text-primary hover:underline p-1">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </button>

          <div className="hidden md:flex items-center space-x-2 pl-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              L
            </div>
            <div>
              <div className="text-sm font-medium">Lisa</div>
              <div className="text-xs text-muted-foreground">Housekeeping Manager</div>
            </div>
          </div>

          <button className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-border/20 animate-slide-in">
          <nav className="flex flex-col p-4 space-y-4 bg-white/80">
            <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary">
              <User className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Lisa</div>
                <div className="text-xs text-muted-foreground">Housekeeping Manager</div>
              </div>
            </div>
            <a href="#" className="p-2 rounded-md hover:bg-secondary flex items-center space-x-3">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span>Settings</span>
            </a>
            <a href="#" className="p-2 rounded-md hover:bg-secondary flex items-center space-x-3">
              <LogOut className="h-5 w-5 text-muted-foreground" />
              <span>Logout</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
