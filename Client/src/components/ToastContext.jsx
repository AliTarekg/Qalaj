import React, { createContext, useState, useCallback } from "react";
export const ToastContext = createContext();
let toastId = 0;
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "info") => {
    setToasts((prev) => [...prev, { id: ++toastId, message, type }]);
    setTimeout(() => setToasts((prev) => prev.slice(1)), 3500);
  }, []);
  const removeToast = useCallback((id) => setToasts((prev) => prev.filter(t => t.id !== id)), []);
  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
