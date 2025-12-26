import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ContextProps, ToastObject } from "./ToastContext.types";
import { Toast } from "../../components";

const defaultPush: (toast: ToastObject) => ToastObject = (toast: ToastObject) =>
  toast;
const defaultClear: (toast: ToastObject) => void = () => {};

export const ToastContext = createContext({
  pushToastRef: { current: defaultPush },
  clearToastRef: { current: defaultClear },
});

const ToastProvider: React.FC<ContextProps> = ({ children }) => {
  const pushToastRef = useRef<(toast: ToastObject) => ToastObject>(defaultPush);
  const clearToastRef = useRef(defaultClear);

  return (
    <ToastContext.Provider
      value={{
        pushToastRef,
        clearToastRef,
      }}
    >
      <Toasts />
      {children}
    </ToastContext.Provider>
  );
};

export const useToasts = () => {
  const { pushToastRef, clearToastRef } = useContext(ToastContext);

  return {
    pushToast: useCallback<(toast: ToastObject) => ToastObject>(
      (toast: ToastObject): ToastObject => {
        return pushToastRef.current(toast);
      },
      [pushToastRef]
    ),
    clearToast: useCallback(
      (toast: ToastObject) => {
        return clearToastRef.current(toast);
      },
      [clearToastRef]
    ),
  };
};

export const Toasts = () => {
  const { pushToastRef, clearToastRef } = useContext(ToastContext);
  const [toasts, setToasts] = useState<ToastObject[]>([]);

  pushToastRef.current = ({ duration, persistent, loading, ...props }) => {
    const id = parseInt(Date.now().toString(), 16);
    let timer: any;

    if (!persistent && !loading) {
      timer = setTimeout(() => {
        setToasts((v) => v.filter((t: ToastObject) => t.id !== id));
      }, (duration ?? 5) * 1000);
    }

    const toast = { ...props, id, timer, loading };

    setToasts((v) => {
      v.forEach((t) => clearTimeout(t.timer));
      return [toast];
    });

    return toast;
  };

  clearToastRef.current = (toast) => {
    clearTimeout(toast.timer);
    setToasts((v) => v.filter((t) => t !== toast));
  };

  const onRemove = (toast: ToastObject) => {
    clearTimeout(toast.timer);
    setToasts((v) => v.filter((t) => t !== toast));
  };

  return (
    <motion.div layout className="windmillui toast-root">
      <AnimatePresence mode="wait">
        {toasts.map((toast: ToastObject) => (
          <motion.div
            onClick={() => {
              toast.timer && onRemove(toast);
            }}
            key={toast.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <Toast {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToastProvider;
