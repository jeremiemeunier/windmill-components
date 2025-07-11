import { AnimatePresence, motion } from "framer-motion";
import { MessageProps } from "./Message.types";

const Message: React.FC<MessageProps> = ({ data, className }) => {
  return (
    data && (
      <AnimatePresence>
        {data.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`windmillui-message-root ${className} ${
              data.type ? `color-${data.type}` : ""
            } ${data.format ? `template-${data.format}` : ""}`}
          >
            {data.icon && <i className={`icon ${data.icon}`}></i>}
            <p>{data.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
};

export default Message;
