import React, { useContext } from "react";
import { ToastContext } from "./ToastContext";
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>{toast.message}<button onClick={() => removeToast(toast.id)}>&times;</button></div>
      ))}
    </div>
  );
};
export default ToastContainer;
