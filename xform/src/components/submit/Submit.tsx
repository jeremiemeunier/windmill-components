import React from "react";
import { XSubmitProps } from "./Submit.types";

/**
 * XSubmit component - Submit button for XForm
 * Simple submit button with styling support
 */
const XSubmit: React.FC<XSubmitProps> = ({
  label,
  disabled,
  className,
  appearance = "primary",
  children,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["windmillui-button"];

    if (appearance) str.push(`appearance-${appearance}`);

    return className ? str.join(" ") + " " + className : str.join(" ");
  };

  return (
    <button
      type="submit"
      disabled={disabled ?? false}
      className={classNameBuilder()}
    >
      {children || label || "Submit"}
    </button>
  );
};

export default XSubmit;
