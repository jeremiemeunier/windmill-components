import React, { useId, useState } from "react";
import { XTextAreaProps } from "./TextArea.types";
import { BaseBlock, InputBlock } from "../base/Base";

/**
 * XTextArea component - FormData-compatible textarea field
 * Uses native HTML textarea with name attribute for automatic FormData extraction
 */
const XTextArea: React.FC<XTextAreaProps> = ({
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
}) => {
  const id = useId();
  const [currentLength, setCurrentLength] = useState(
    defaultValue?.length ?? 0
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

export default XTextArea;
