import React, { useId } from "react";
import { CheckboxProps } from "./Checkbox.types";
import { InputBlock } from "../base/Base";

/**
 * Checkbox component - FormData-compatible checkbox field
 * Uses native HTML checkbox with name attribute for automatic FormData extraction
 */
const Checkbox: React.FC<CheckboxProps> = ({
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

export default Checkbox;
