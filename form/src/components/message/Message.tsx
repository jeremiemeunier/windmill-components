import { MessageProps } from "./Message.types";

const Message: React.FC<MessageProps> = ({ data, className }) => {
  if (data)
    return (
      <>
        {data.content && (
          <div
            className={`windmillui-message-root ${className} ${
              data.type ? `color-${data.type}` : ""
            } ${data.format ? `template-${data.format}` : ""}`}
          >
            {data.icon && <i className={`icon ${data.icon}`}></i>}
            <p>{data.content}</p>
          </div>
        )}
      </>
    );

  return <></>;
};

export default Message;
