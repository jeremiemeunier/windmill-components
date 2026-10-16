import React, { useId, useState } from "react";
import { TextAreaProps } from "./TextArea.types";
import { Box } from "../base/Base";

/**
 * TextArea component - FormData-compatible textarea field
 * Uses native HTML textarea with name attribute for automatic FormData extraction
 */
const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  size,
  readOnly,
  tagline,
  maxLength,
  placeholder,
  disabled,
  required,
  className,
  rows,
  defaultValue,
  error,
  onChange,
}) => {
  const id = useId();
  const [currentLength, setCurrentLength] = useState(defaultValue?.length ?? 0);

  return (
    <Box.Root
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <Box.Input
        error={error}
        maxLength={
          maxLength
            ? {
                value: maxLength,
                current: currentLength,
              }
            : undefined
        }
        className={className}
      >
        <textarea
          disabled={disabled ?? false}
          name={name}
          id={id}
          readOnly={readOnly ?? false}
          maxLength={maxLength}
          placeholder={placeholder ?? ""}
          rows={rows ?? 4}
          defaultValue={defaultValue}
          required={required}
          onChange={(evt) => {
            if (maxLength) {
              setCurrentLength(evt.target.value.length);
            }
            if (onChange) {
              onChange(evt);
            }
          }}
        />
      </Box.Input>
    </Box.Root>
  );
};

export default TextArea;
