import React from "react";
import { SubmitProps } from "./Submit.types";
import { Loader } from "@jeremiemeunier/core";

/**
 * Submit component - Submit button for Form
 * Simple submit button with styling support
 */
const Submit: React.FC<SubmitProps> = ({
  size,
  label,
  loading,
  locked,
  className,
  children,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["windmillui windmillui grid cta-container ha-end"];

    if (size) str.push(`size-${size}x`);
    if (className) str.push(className);

    return className ? str.join(" ") + " " + className : str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {children}
      <button
        className="windmillui cta level-primary format-icon-right"
        disabled={loading || locked ? true : false}
      >
        <span>{label}</span>
        <i className="icon ti ti-arrow-right"></i>
        {loading && <Loader />}
      </button>
    </div>
  );
};

export default Submit;
