"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface AlertProps {
  title: string;
  messages: string[];
  type: "success" | "error" | "warning" | "info";
}

interface AlertContextProps {
  showAlert: (alert: AlertProps, autoCloseDuration?: number) => void;
  closeAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

const dotClasses: Record<AlertProps["type"], string> = {
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warn",
  info: "bg-accent",
};

const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const closeAlert = () => {
    clearTimer();
    setAlert(null);
  };

  const showAlert = (newAlert: AlertProps, autoCloseDuration?: number) => {
    clearTimer();
    setAlert(newAlert);
    const duration =
      autoCloseDuration ?? (newAlert.type === "error" ? 6000 : 3200);
    timeoutRef.current = setTimeout(() => {
      setAlert(null);
      timeoutRef.current = null;
    }, duration);
  };

  useEffect(() => clearTimer, []);

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {alert && (
        <div
          role={alert.type === "error" ? "alert" : "status"}
          aria-live={alert.type === "error" ? "assertive" : "polite"}
          aria-atomic="true"
          className="fixed inset-x-4 bottom-4 z-[70] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px]"
        >
          <div className="toast-enter flex items-start gap-3 rounded-md border border-line bg-surface p-4 shadow-pop">
            <span
              aria-hidden="true"
              className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${dotClasses[alert.type]}`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-ink">{alert.title}</p>
              {alert.messages.map((message, index) => (
                <p
                  key={index}
                  className="mt-1 text-[12.5px] leading-relaxed text-ink-soft"
                >
                  {message}
                </p>
              ))}
            </div>
            <button
              type="button"
              onClick={closeAlert}
              aria-label="Dismiss notification"
              className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded text-[18px] leading-none text-ink-muted transition-colors hover:bg-paper hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export default AlertProvider;
