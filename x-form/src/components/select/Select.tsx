import React, { useId } from "react";
import { XSelectProps } from "./Select.types";
import { BaseBlock, SelectBlock } from "../base/Base";

/**
 * XSelect component - FormData-compatible select field
 * Uses native HTML select with name attribute for automatic FormData extraction
 */
const XSelect: React.FC<XSelectProps> = ({
  name,
  label,
  size,
  disabled,
  tagline,
  required,
  className,
  defaultValue,
  error,
  children,
}) => {
  const id = useId();

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <SelectBlock error={error} className={className}>
        <select
          disabled={disabled ?? false}
          name={name}
          id={id}
          defaultValue={defaultValue}
          required={required}
        >
          {children}
        </select>
      </SelectBlock>
    </BaseBlock>
  );
};

export default XSelect;
