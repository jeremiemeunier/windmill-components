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
  TitleProps,
} from "./Modal.types";

const Modal: React.FC<ModalProps> & {
  Background: React.FC<CloseProps>;
  Body: React.FC<BodyProps>;
  Title: React.FC<TitleProps>;
  Close: React.FC<CloseProps>;
  MenuLeft: React.FC<ModalContainerProps>;
  MenuRight: React.FC<ModalContainerProps>;
  ModalCenter: React.FC<ModalContainerProps>;
  Navigation: React.FC<NavigationProps> & {
    Item: React.FC<NavigationItemProps>;
  };
  Pages: React.FC<BodyProps>;
} = ({ children }) => {
  return <motion.div className="teaui modal">{children}</motion.div>;
};

const Background: React.FC<CloseProps> = ({
  setModalVisibility,
  refreshing,
  refreshHandler,
}) => {
  const closeHandler = () => {
    setModalVisibility(false);

    if (refreshing && refreshHandler) {
      refreshHandler();
    }
  };

  return (
    <motion.div
      className="teaui modal-background style-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ transition: 0.4, ease: "easeOut" }}
      onClick={closeHandler}
    ></motion.div>
  );
};
Modal.Background = Background;

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="teaui modal-header mtn48 ms-mtn48 xs-mtn48">{children}</div>
  );
};
Modal.Title = Title;

const Close: React.FC<CloseProps> = ({
  setModalVisibility,
  refreshing,
  refreshHandler,
}) => {
  const closeHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setModalVisibility(false);

    if (refreshing && refreshHandler) {
      refreshHandler();
    }
  };

  return (
    <button
      className="teaui cta level-tertiary format-icon-only size-large sl modal-close"
      onClick={closeHandler}
    >
      <i className="icon teaui-icon-cross"></i>
    </button>
  );
};
Modal.Close = Close;

const MenuLeft: React.FC<ModalContainerProps> = ({ children, size }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={`teaui modal-container format-menu position-left ${
        size ? `size-${size} ${size}` : ""
      }`}
    >
      <SimpleBar style={{ maxHeight: "100vh" }}>{children}</SimpleBar>
    </motion.div>
  );
};
Modal.MenuLeft = MenuLeft;

const MenuRight: React.FC<ModalContainerProps> = ({ children, size }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={`teaui modal-container format-menu position-right ${
        size ? `size-${size} ${size}` : ""
      }`}
    >
      <SimpleBar style={{ maxHeight: "100vh" }}>{children}</SimpleBar>
    </motion.div>
  );
};
Modal.MenuRight = MenuRight;

const ModalCenter: React.FC<ModalContainerProps> = ({
  children,
  size,
  template,
  direction = "top",
}) => {
  const returnMaxSizeScroll = () => {
    if (size === "fullscreen") {
      return "calc(100vh - 32px)";
    }
    if (template === "menu") {
      return "100vh";
    }

    return "90vh";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: direction === "top" ? -100 : 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: direction === "top" ? -100 : 100 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={`teaui modal-container ${size ? `size-${size} ${size}` : ""}`}
    >
      <SimpleBar style={{ maxHeight: returnMaxSizeScroll() }}>
        {children}
      </SimpleBar>
    </motion.div>
  );
};
Modal.ModalCenter = ModalCenter;

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <div className="teaui modal-content pa16 ms-pa16 xs-pa16">{children}</div>
  );
};
Modal.Body = Body;

const Navigation: React.FC<NavigationProps> & {
  Item: React.FC<NavigationItemProps>;
} = ({ children }) => {
  return (
    <div className="teaui pa16 ms-pa16 xs-pa16">
      <nav className="teaui tab-nav tab-size-full">{children}</nav>
    </div>
  );
};
Modal.Navigation = Navigation;

const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  setModalPage,
  isActive,
  id,
}) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        setModalPage(id);
      }}
      className={isActive ? "active" : ""}
    >
      {label}
    </button>
  );
};
Navigation.Item = NavigationItem;

const Pages: React.FC<BodyProps> = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};
Modal.Pages = Pages;

export default Modal;
