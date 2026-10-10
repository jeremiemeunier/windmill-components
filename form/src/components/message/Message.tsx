import { type MessageProps } from "./Message.types";
import MarkDown from "react-markdown";

const Message: React.FC<MessageProps> = ({ data, className, children }) => {
  const classBuilder = () => {
    const string: string[] = ["message-container"];

    if (className) string.push(className);
    if (data?.type) string.push(`color-${data.type}`);
    if (data?.format) string.push(`template-${data.format}`);

    return string.join(" ");
  };

  if (!data || !data.content) return null;

  const role = data.type === "negative" ? "alert" : "status";

  return (
    <div
      className={classBuilder()}
      role={role}
      aria-live={role === "status" ? "polite" : undefined}
    >
      {data.icon && <i className={`icon ${data.icon}`} aria-hidden="true"></i>}
      <MarkDown>{data.content}</MarkDown>
      {data.format === "icon-cta" || data.format === "cta" ? (
        <div className="cta-container">{children}</div>
      ) : null}
    </div>
  );
};

export default Message;
