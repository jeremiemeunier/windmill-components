import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import type {
  PopoverContentTypes,
  PopoverTriggerTypes,
  PopoverTypes,
} from "./Popover.types";

const Popover: React.FC<PopoverTypes> & {
  Trigger: React.FC<PopoverTriggerTypes>;
  Content: React.FC<PopoverContentTypes>;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Inject props into children
  const enhancedChildren = Array.isArray(children)
    ? children.map((child, index) => {
        if (isValidElement(child)) {
          if (child.type === Popover.Trigger) {
            return cloneElement(child, {
              toggleOpen,
              triggerRef,
              key: index,
            } as any);
          }

          if (child.type === Popover.Content) {
            return cloneElement(child, {
              isOpen,
              contentRef,
              key: index,
            } as any);
          }
        }
        return child;
      })
    : children;

  const classBuilder = () => {
    const string: string[] = ["popover-wrapper"];

    if (isOpen) string.push("is-open");

    return string.join(" ");
  };

  return (
    <div
      className={classBuilder()}
      style={{ position: "relative", display: "inline-block" }}
    >
      {enhancedChildren}
    </div>
  );
};

export default Popover;

const Trigger: React.FC<
  PopoverTriggerTypes & {
    toggleOpen?: () => void;
    triggerRef?: React.RefObject<HTMLButtonElement>;
  }
> = ({
  className,
  children,
  level,
  format,
  size,
  title,
  onClick,
  toggleOpen,
  triggerRef,
}) => {
  const classBuilder = () => {
    const string: string[] = ["cta"];

    if (className) string.push(className);
    if (level) string.push(level);
    if (format) string.push(format);
    if (size) string.push(size);

    return string.join(" ");
  };

  const handleClick = () => {
    console.log("Popover Trigger clicked");
    toggleOpen?.();
    onClick?.();
  };

  return (
    <button
      ref={triggerRef}
      title={title ?? undefined}
      className={classBuilder()}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
};
Popover.Trigger = Trigger;

const Content: React.FC<
  PopoverContentTypes & {
    isOpen?: boolean;
    contentRef?: React.RefObject<HTMLDivElement>;
  }
> = ({ align = "start", className, children, isOpen, contentRef }) => {
  const getAlignmentStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      top: "calc(100% + 8px)",
      zIndex: 1000,
    };

    switch (align) {
      case "start":
        return { ...baseStyle, left: 0 };
      case "center":
        return { ...baseStyle, left: "50%", transform: "translateX(-50%)" };
      case "end":
        return { ...baseStyle, right: 0 };
      default:
        return { ...baseStyle, left: 0 };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          ref={contentRef}
          className={`popover-content ${className || ""}`}
          style={getAlignmentStyle()}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
Popover.Content = Content;
