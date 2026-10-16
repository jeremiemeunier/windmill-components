import React, { useEffect, useId, useState } from "react";
import { Box } from "../base/Base";
import type { InputProps } from "./Input.types";

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
  dataIsLoading,
  error,
  regex,
  locked,
  onChange,
}) => {
  const id = useId();

  const [internError, setInternError] = useState<string>("");
  const [currentLength, setCurrentLength] = useState<number>(
    defaultValue?.toString().length ?? 0,
  );

  useEffect(() => {
    if (defaultValue) {
      setCurrentLength(defaultValue.toString().length);
    }
  }, [defaultValue]);

  return (
    <Box.Root
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <Box.Input
        error={internError || error}
        maxLength={
          maxLength
            ? {
                value: maxLength,
                current: currentLength,
              }
            : undefined
        }
        className={className}
        dataIsLoading={dataIsLoading}
        locked={locked}
      >
        <input
          disabled={(disabled || locked?.value) ?? false}
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

            if (onChange) {
              onChange(evt);
            }

            if (regex) {
              if (!regex.value || !regex.message) {
                console.error(
                  "Input component: regex prop requires both value and message properties",
                );
                return;
              }

              if (regex.type === "required") {
                if (!regex.value.test(evt.target.value)) {
                  setInternError(regex.message);
                } else {
                  setInternError("");
                }
                return;
              }

              if (regex.type === "rejected") {
                if (regex.value.test(evt.target.value)) {
                  setInternError(regex.message);
                } else {
                  setInternError("");
                }
              }
            }
          }}
        />
      </Box.Input>
    </Box.Root>
  );
};

export default Input;
