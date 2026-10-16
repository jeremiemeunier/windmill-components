import React, { useId } from "react";
import type { CheckboxProps } from "./Checkbox.types";
import { Box } from "../base/Base";

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
  tagline,
  onChange,
}) => {
  const id = useId();

  return (
    <Box.Root id={id} tagline={tagline}>
      <Box.CheckboxRadio error={error} className={className}>
        <div className="windmillui-checkbox">
          <input
            type="checkbox"
            name={name}
            id={id}
            value={value ?? "on"}
            defaultChecked={defaultChecked}
            disabled={disabled ?? false}
            onChange={onChange}
          />
          <label htmlFor={id}>{children || label}</label>
        </div>
      </Box.CheckboxRadio>
    </Box.Root>
  );
};

export default Checkbox;
