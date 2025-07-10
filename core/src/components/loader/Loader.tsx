import React from "react";
import { LoaderProps } from "./Loader.types";
import "./Loader.scss";

const Loader: React.FC<LoaderProps> = ({ width, color }) => {
  return (
    <span className="infusedui-loader" style={{ width: width }}>
      <svg viewBox="25 25 50 50">
        <circle style={{ stroke: color }} r="20" cy="50" cx="50"></circle>
      </svg>
    </span>
  );
};

export default Loader;
