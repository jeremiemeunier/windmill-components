import React, { useId } from "react";
import { XRadioProps } from "./Radio.types";
import { BaseBlock, RadioCheckboxBlock } from "../base/Base";

/**
 * XRadio component - FormData-compatible radio button group
 * Uses native HTML radio inputs with name attribute for automatic FormData extraction
 */
const XRadio: React.FC<XRadioProps> = ({
  name,
  label,
  options,
  size,
  disabled,
  tagline,
  required,
  className,
  defaultValue,
  error,
  gridSize = 2,
}) => {
  const groupId = useId();

  return (
    <BaseBlock
      id={groupId}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <RadioCheckboxBlock error={error} gridSize={gridSize} className={className}>
        {options.map((option, index) => {
          const id = `${groupId}-${index}`;
          return (
            <div key={id} className="windmillui-radio">
              <input
                type="radio"
                name={name}
                id={id}
                value={option.value}
                defaultChecked={defaultValue === option.value}
                disabled={disabled ?? false}
                required={required}
              />
              <label htmlFor={id}>{option.label}</label>
            </div>
          );
        })}
      </RadioCheckboxBlock>
    </BaseBlock>
  );
};

export default XRadio;
