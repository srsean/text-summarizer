"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { FaCircleExclamation, FaXmark } from "react-icons/fa6";

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

const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const showAlert = (newAlert: AlertProps, autoCloseDuration = 3000) => {
    setAlert(newAlert);
    setTimeout(() => {
      setAlert(null);
    }, autoCloseDuration);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const alertTypeClasses = {
    success: "bg-green-100 border border-2 border-green-200",
    error: "bg-red-100 border border-2 border-red-200",
    warning: "bg-yellow-100 border border-2 border-yellow-200",
    info: "bg-blue-100 border border-2 border-blue-200",
  };

  const iconClasses = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {alert && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50`}>
          <div
            className={`flex flex-row relative rounded-xl w-[400px] p-4 text-black ${alertTypeClasses[alert.type]}`}
            role="alert"
          >
            <div>
              <FaCircleExclamation className={`h-6 w-6 ${iconClasses[alert.type]}`} />
            </div>
            <div>
              <div className="ml-4">
                <div className="font-bold">{alert.title}</div>
                {alert.messages.length > 1 ? (
                  <ul className="list-disc list-inside text-[#0F132499]">
                    {alert.messages.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                ) : (
                  <div>{alert.messages[0]}</div>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4">
              <button onClick={closeAlert}>
                <FaXmark className="text-[#0F132499]" />
              </button>
            </div>
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
