import React, { useId, useState } from "react";
import { InputProps } from "./Input.types";
import { BaseBlock, InputBlock } from "../base/Base";

/**
 * Input component - FormData-compatible input field
 * Uses native HTML input with name attribute for automatic FormData extraction
 */
const Input: React.FC<InputProps> = ({
  name,
  label,
  size,
  readOnly,
  tagline,
  type,
  maxLength,
  placeholder,
  disabled,
  required,
  autofocus,
  autoComplete,
  className,
  min,
  max,
  step,
  defaultValue,
  error,
}) => {
  const id = useId();
  const [currentLength, setCurrentLength] = useState(
    defaultValue?.toString().length ?? 0
  );

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <InputBlock error={error} maxLength={maxLength} className={className}>
        <input
          disabled={disabled ?? false}
          type={type ?? "text"}
          name={name}
          id={id}
          readOnly={readOnly ?? false}
          maxLength={maxLength}
          placeholder={placeholder ?? ""}
          autoFocus={autofocus ?? false}
          min={min}
          max={max}
          step={step}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          required={required}
          onChange={(evt) => {
            if (maxLength) {
              setCurrentLength(evt.target.value.length);
            }
          }}
        />
        {maxLength && (
          <span className="windmillui-max-length">
            {currentLength} / {maxLength}
          </span>
        )}
      </InputBlock>
    </BaseBlock>
  );
};

export default Input;
