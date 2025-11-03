import Snackbar from "@mui/material/Snackbar";
import { createContext, useState } from "react";
import Alert from "@mui/material/Alert";
export const ToastContext = createContext();
export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: "" });
  function showToast(message = "") {
    setToast({ open: true, message });
  }
  function closeToast() {
    setToast({ open: false, message: "" });
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, closeToast }}>
      {toast && toast.open && (
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={closeToast}
        >
          <Alert
            onClose={closeToast}
            severity="success"
            variant="filled"
            sx={{ width: "90%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </ToastContext.Provider>
  );
}
