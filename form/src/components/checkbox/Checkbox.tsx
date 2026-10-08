import React, { useId } from "react";
import type { CheckboxProps } from "./Checkbox.types";
import { BaseBlock, InputBlock } from "../base/Base";

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
}) => {
  const id = useId();

  return (
    <BaseBlock id={id} label={label}>
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
      {tagline ?? null}
    </BaseBlock>
  );
};

export default Checkbox;
