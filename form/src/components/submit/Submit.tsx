import React from "react";
import type { SubmitProps } from "./Submit.types";

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
  buttonSize,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["grid cta-container ha-end"];

    if (size) str.push(`size-${size}x`);
    if (className) str.push(className);

    return className ? str.join(" ") + " " + className : str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {children}
      <button
        className={`cta level-primary format-icon-right ${buttonSize} ${loading ? "state-loading" : ""} ${locked ? "state-disabled" : ""}`}
        type="submit"
        disabled={loading || locked ? true : false}
        aria-busy={loading ? true : undefined}
        aria-disabled={locked ? true : undefined}
      >
        <span>{label}</span>
        <i className="icon ti ti-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Submit;
