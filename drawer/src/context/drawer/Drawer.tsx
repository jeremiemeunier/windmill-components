import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { ContextProps, ProviderProps } from "./Drawer.types";
import { AnimatePresence, motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./Drawer.scss";

const defaultDrawerContent: (element: React.ReactNode) => void = (
  element: React.ReactNode
) => {};

export const DrawerContext = createContext<ProviderProps>({
  drawerContentRef: { current: defaultDrawerContent },
  setDrawerOpen: () => {},
  drawerOpen: false,
});

const DrawerProvider: React.FC<ContextProps> = ({ children }) => {
  const drawerContentRef =
    useRef<(element: React.ReactNode) => void>(defaultDrawerContent);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <DrawerContext.Provider
      value={{
        drawerContentRef,
        setDrawerOpen,
        drawerOpen,
      }}
    >
      <div className={`drawer-root ${drawerOpen ? "open" : "close"}`}>
        <div className="drawer-page">{children}</div>
        <div className="drawer-container-root">
          <div
            className="drawer-background"
            onClick={() => {
              setDrawerOpen(false);
            }}
          ></div>
          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="drawer-container"
              >
                <SimpleBar style={{ maxHeight: "60vh" }}>
                  <div className="drawer-content">
                    {drawerContentRef.current as unknown as React.ReactNode}
                  </div>
                </SimpleBar>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;

export const useDrawer = () => {
  const { drawerContentRef, setDrawerOpen, drawerOpen } =
    useContext(DrawerContext);

  return {
    pushContent: useCallback<(element: React.ReactNode) => React.ReactNode>(
      (element: React.ReactNode): React.ReactNode => {
        drawerContentRef.current = element;
        return;
      },
      [drawerContentRef]
    ),
    openDrawer: useCallback(() => {
      setDrawerOpen(true);
      return;
    }, []),
    closeDrawer: useCallback(() => {
      setDrawerOpen(false);
      return;
    }, []),
    switchDrawer: useCallback(() => {
      setDrawerOpen(!drawerOpen);
      return;
    }, []),
  };
};
