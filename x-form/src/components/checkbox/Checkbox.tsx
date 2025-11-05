import React, { useId } from "react";
import { XCheckboxProps } from "./Checkbox.types";
import { InputBlock } from "../base/Base";

/**
 * XCheckbox component - FormData-compatible checkbox field
 * Uses native HTML checkbox with name attribute for automatic FormData extraction
 */
const XCheckbox: React.FC<XCheckboxProps> = ({
  name,
  label,
  value,
  disabled,
  className,
  defaultChecked,
  error,
  children,
}) => {
  const id = useId();

  return (
    <InputBlock error={error} className={className}>
      <div className="windmillui-checkbox">
        <input
          type="checkbox"
          name={name}
          id={id}
          value={value ?? "on"}
          defaultChecked={defaultChecked}
          disabled={disabled ?? false}
        />
        <label htmlFor={id}>{children || label}</label>
      </div>
    </InputBlock>
  );
};

export default XCheckbox;
