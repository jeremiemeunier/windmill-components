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
  ModalSmallActionsProps,
  ModalActionsProps,
} from "./Modal.types";
import { Link } from "react-router-dom";

const sizeAliases: Record<string, string> = {
  small: "s-sm",
  medium: "s-md",
  large: "s-lg",
  fullscreen: "s-fs",
  sl: "s-lg",
  sm: "s-md",
  sf: "s-fs",
};

const getSizeClass = (size?: ModalContainerProps["size"]) => {
  if (!size) return "";
  const normalizedSize = sizeAliases[size] ?? size;
  return normalizedSize === size
    ? `size-${normalizedSize} ${normalizedSize}`
    : `size-${normalizedSize} ${normalizedSize} ${size}`;
};

const Modal: React.FC<ModalProps> & {
  Background: React.FC<CloseProps>;
  Body: React.FC<BodyProps>;
  Header: React.FC<HeaderProps>;
  Close: React.FC<CloseProps>;
  SmallActions: React.FC<ModalSmallActionsProps> & {
    Action: React.FC<ModalActionsProps>;
  };
  MenuLeft: React.FC<ModalContainerProps>;
  MenuRight: React.FC<ModalContainerProps>;
  ModalCenter: React.FC<ModalContainerProps>;
  Navigation: React.FC<NavigationProps> & {
    Item: React.FC<NavigationItemProps>;
  };
  Pages: React.FC<BodyProps>;
} = ({ children }) => {
  return (
    <motion.div className="windmillui-modal modal-root">{children}</motion.div>
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
      className="windmillui-modal modal-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      onClick={closeHandler}
    ></motion.div>
  );
};
Modal.Background = Background;

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <div className="windmillui-modal modal-header">{children}</div>;
};
Modal.Header = Header;

const Close: React.FC<CloseProps> = ({ setVisibility, refreshHandler }) => {
  const closeHandler = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    evt.preventDefault();
    setVisibility(false);

    if (refreshHandler) {
      refreshHandler();
    }
  };

  return (
    <button
      className="windmillui-modal modal-close"
      onClick={closeHandler}
      aria-label="Close dialog"
      type="button"
    >
      <i className="icon ti ti-x" aria-hidden="true"></i>
    </button>
  );
};
Modal.Close = Close;

const SmallActions: React.FC<ModalSmallActionsProps> & {
  Action: React.FC<ModalActionsProps>;
} = ({ children }) => {
  return (
    <div className="windmillui-modal modal-small-actions">
      {/* Small action buttons can be added here */}
      {children}
    </div>
  );
};

const Action: React.FC<ModalActionsProps> = ({
  children,
  isLink,
  to,
  title,
  handler,
}) => {
  if (!children) return null;
  if (isLink && !to) return null;

  if (isLink && to) {
    return (
      <Link
        to={to}
        aria-label={title}
        title={title}
        className="windmillui-modal modal-small-action-trigger"
      >
        {children}
      </Link>
    );
  }

  if (handler) {
    return (
      <button
        onClick={handler}
        aria-label={title}
        title={title}
        className="windmillui-modal modal-small-action-trigger"
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      aria-label={title}
      title={title}
      className="windmillui-modal modal-small-action-trigger"
      type="button"
    >
      {children}
    </button>
  );
};
SmallActions.Action = Action;
Modal.SmallActions = SmallActions;

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
      className={`windmillui-modal modal-container format-menu position-left ${getSizeClass(size)}`}
      role="dialog"
      aria-modal="true"
      aria-label="Dialog"
    >
      <SimpleBar style={{ maxHeight: maxHeight, minHeight: maxHeight }}>
        {children}
      </SimpleBar>
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
      transition={{ ease: "easeOut", duration: 0.1 }}
      className={`windmillui-modal modal-container format-menu position-right ${getSizeClass(size)}`}
      role="dialog"
      aria-modal="true"
      aria-label="Dialog"
    >
      <SimpleBar style={{ maxHeight: maxHeight, minHeight: maxHeight }}>
        {children}
      </SimpleBar>
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
      if (sizeAliases[size ?? ""] === "s-fs" || size === "s-fs") {
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
      transition={{ ease: "easeOut", duration: 0.1 }}
      className={`windmillui-modal modal-container ${getSizeClass(size)}`}
      role="dialog"
      aria-modal="true"
      aria-label="Dialog"
    >
      <SimpleBar
        style={{
          maxHeight: returnMaxHeightScroll(),
        }}
      >
        {children}
      </SimpleBar>
    </motion.div>
  );
};
Modal.ModalCenter = ModalCenter;

const Body: React.FC<BodyProps> = ({ children, id, tabPanel }) => {
  const tabId = tabPanel && id ? `${id}-tab` : undefined;

  return (
    <div
      className="windmillui-modal modal-content"
      id={id}
      role={tabPanel ? "tabpanel" : undefined}
      aria-labelledby={tabId}
      tabIndex={tabPanel ? 0 : undefined}
    >
      {children}
    </div>
  );
};
Modal.Body = Body;

const Navigation: React.FC<NavigationProps> & {
  Item: React.FC<NavigationItemProps>;
} = ({ children }) => {
  return (
    <nav
      className="windmillui-modal modal-nav tab-nav tab-size-full"
      role="tablist"
    >
      {children}
    </nav>
  );
};
Modal.Navigation = Navigation;

const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  setPage,
  isActive,
  pageId,
  panelId,
}) => {
  const tabId = `${String(panelId ?? pageId)}-tab`;

  return (
    <button
      onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        setPage(pageId);
      }}
      className={isActive ? "active" : ""}
      id={tabId}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={0}
      type="button"
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
