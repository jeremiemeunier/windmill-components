import React, { useState, useEffect } from "react";
import type { TimerProps, ToastProps } from "./Toast.types";
import { Loader } from "@jeremiemeunier/core";

export const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timer, setTimer] = useState(duration || 120);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  const formattedTime = (timer: number) => {
    let minutes: number = Math.floor(timer / 60);
    let secondes: number = timer - Math.floor(minutes * 60);

    return `${minutes.toString().padStart(2, "0")}:${secondes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <span className="windmillui tag stroke color-main text format-number timer">
      {formattedTime(timer)}
    </span>
  );
};

const Toast: React.FC<ToastProps> = ({
  title,
  content,
  type = "default",
  icon,
  loading,
  position,
}) => {
  const buildClass = () => {
    const string: string[] = ["windmillui-toast-root"];

    if (type) string.push(`color-${type}`);
    if (position) string.push(position);
    else string.push("bl");

    if (icon || loading) string.push("template-icon");

    return string.join(" ");
  };

  return (
    content && (
      <>
        <div className={buildClass()}>
          {/* Render toast loader or icon */}
          {icon || loading ? (
            <div className="toast-icon-container">
              {icon && <i className={`icon ${icon}`}></i>}
              {loading && <Loader />}
            </div>
          ) : null}

          {/* Render text */}
          <div className="toast-text-container">
            {title && <p className="toast-text-title">{title}</p>}
            <div className="content">
              <p className="toast-text-message">{content}</p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Toast;
