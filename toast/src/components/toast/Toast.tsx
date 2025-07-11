import React, { useState, useEffect } from "react";
import { Loader } from "@jeremiemeunier/core";
import { TimerProps, ToastProps } from "./Toast.types";
import "./Toast.scss";

export const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timer, setTimer] = useState(duration || 120);

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => {
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
  format,
  icon,
  loading,
  timed,
  position,
}) => {
  return (
    content && (
      <div
        className={`windmillui-toast-root color-${type} ${
          position ? position : "bl"
        }`}
      >
        {title && <p className="title">{title}</p>}
        <div
          className={`content ${
            format && format.icon
              ? `icon-${format?.icon}`
              : format && format.countdown
              ? "countdown"
              : ""
          }`}
        >
          {icon && <i className={`icon windmill-icon-${icon}`}></i>}
          {timed && <Timer duration={timed} />}
          {loading && <Loader />}
          <div className="content">
            <p className="message">{content}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Toast;
