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
  orientation,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["grid", "cta-container"];

    if (size) str.push(`size-${size}x`);
    if (className) str.push(className);
    if (orientation) str.push(`format-${orientation}`);
    if (orientation === "col" || !orientation) str.push("ha-end");

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
        <span>{label ?? "Submit"}</span>
        <i className="icon ti ti-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Submit;
