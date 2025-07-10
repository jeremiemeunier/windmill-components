import { motion, AnimatePresence } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  BodyProps,
  CloseProps,
  ModalContainerProps,
  ModalProps,
  NavigationItemProps,
  NavigationProps,
  HeaderProps,
} from "./Modal.types";

const Modal: React.FC<ModalProps> & {
  Background: React.FC<CloseProps>;
  Body: React.FC<BodyProps>;
  Header: React.FC<HeaderProps>;
  Close: React.FC<CloseProps>;
  MenuLeft: React.FC<ModalContainerProps>;
  MenuRight: React.FC<ModalContainerProps>;
  ModalCenter: React.FC<ModalContainerProps>;
  Navigation: React.FC<NavigationProps> & {
    Item: React.FC<NavigationItemProps>;
  };
  Pages: React.FC<BodyProps>;
} = ({ children }) => {
  return (
    <motion.div className="infusedui-modal modal-root">{children}</motion.div>
  );
};

const Background: React.FC<CloseProps> = ({
  setVisibility,
  refreshHandler,
}) => {
  const closeHandler = () => {
    setVisibility(false);

    if (refreshHandler) {
      refreshHandler();
    }
  };

  return (
    <motion.div
      className="infusedui-modal modal-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ transition: 0.3, ease: "easeOut" }}
      onClick={closeHandler}
    ></motion.div>
  );
};
Modal.Background = Background;

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <div className="infusedui-modal modal-header">{children}</div>;
};
Modal.Header = Header;

const Close: React.FC<CloseProps> = ({ setVisibility, refreshHandler }) => {
  const closeHandler = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    setVisibility(false);

    if (refreshHandler) {
      refreshHandler();
    }
  };

  return (
    <button className="infusedui-modal modal-close" onClick={closeHandler}>
      <i className="icon teaui-icon-cross"></i>
    </button>
  );
};
Modal.Close = Close;

const MenuLeft: React.FC<ModalContainerProps> = ({
  children,
  size,
  maxHeight = "100vh",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={`infusedui-modal modal-container format-menu position-left ${
        size ? `size-${size} ${size}` : ""
      }`}
    >
      <SimpleBar style={{ maxHeight: maxHeight }}>{children}</SimpleBar>
    </motion.div>
  );
};
Modal.MenuLeft = MenuLeft;

const MenuRight: React.FC<ModalContainerProps> = ({
  children,
  size,
  maxHeight = "100vh",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={`infusedui-modal modal-container format-menu position-right ${
        size ? `size-${size} ${size}` : ""
      }`}
    >
      <SimpleBar style={{ maxHeight: maxHeight }}>{children}</SimpleBar>
    </motion.div>
  );
};
Modal.MenuRight = MenuRight;

const ModalCenter: React.FC<ModalContainerProps> = ({
  children,
  size,
  template,
  direction = "top",
  maxHeight = "90vh",
}) => {
  const returnMaxHeightScroll = () => {
    if (maxHeight) return maxHeight;
    else {
      if (size === "fullscreen") {
        return "calc(100vh - 32px)";
      }
      if (template === "menu") {
        return "100vh";
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: direction === "top" ? -100 : 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: direction === "top" ? -100 : 100 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={`infusedui-modal modal-container ${
        size ? `size-${size} ${size}` : ""
      }`}
    >
      <SimpleBar style={{ maxHeight: returnMaxHeightScroll() }}>
        {children}
      </SimpleBar>
    </motion.div>
  );
};
Modal.ModalCenter = ModalCenter;

const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className="infusedui-modal modal-content">{children}</div>;
};
Modal.Body = Body;

const Navigation: React.FC<NavigationProps> & {
  Item: React.FC<NavigationItemProps>;
} = ({ children }) => {
  return <nav className="infusedui-modal modal-nav">{children}</nav>;
};
Modal.Navigation = Navigation;

const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  setPage,
  isActive,
  pageId,
}) => {
  return (
    <button
      onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        setPage(pageId);
      }}
      className={isActive ? "active" : ""}
    >
      {label}
    </button>
  );
};
Navigation.Item = NavigationItem;

const Pages: React.FC<BodyProps> = ({ children }) => {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
};
Modal.Pages = Pages;

export default Modal;
