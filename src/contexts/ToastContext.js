import { createContext, useState, useContext } from "react";
import { Toast } from "react-bootstrap";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
        {toasts.map(t => (
          <Toast key={t.id} bg={t.type} show={true} autohide delay={3000}>
            <Toast.Body style={{ color: "#fff" }}>{t.message}</Toast.Body>
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);