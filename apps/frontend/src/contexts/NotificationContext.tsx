import React, { createContext, useState, useContext, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

// Define the shape of the context
interface NotificationContextType {
  showNotification: (message: string, severity?: AlertColor) => void;
}

// Create a context with a default value of undefined
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// Custom hook to use the notification context
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

// Define the props for the provider component
interface NotificationProviderProps {
  children: ReactNode;
}

// NotificationProvider component
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  // Function to show a notification
  const showNotification = (msg: string, sev: AlertColor = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  // Function to handle snackbar close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
