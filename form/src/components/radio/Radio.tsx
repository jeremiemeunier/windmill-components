import React, { useId } from "react";
import type { RadioProps } from "./Radio.types";
import { Box, RadioCheckboxBlock } from "../base/Base";

/**
 * Radio component - FormData-compatible radio button group
 * Uses native HTML radio inputs with name attribute for automatic FormData extraction
 */
const Radio: React.FC<RadioProps> = ({
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
  viewBox,
  dataIsLoading,
  onChange,
}) => {
  const groupId = useId();

  const classBuilder = (special?: string) => {
    const str = ["windmillui-radio"];

    if (viewBox) str.push("template-no-check");
    if (special) str.push(special);

    return str.join(" ");
  };

  return (
    <Box.Root
      id={groupId}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <RadioCheckboxBlock
        error={error}
        gridSize={gridSize}
        className={className}
        dataIsLoading={dataIsLoading}
      >
        {options.map((option, index) => {
          const id = `${groupId}-${index}`;
          return (
            <div key={id} className={classBuilder()}>
              <input
                type="radio"
                name={name}
                id={id}
                value={option.value}
                defaultChecked={defaultValue === option.value}
                disabled={(disabled || option.disabled) ?? false}
                onChange={(e) => onChange?.(e.target.value)}
                required={required}
              />
              <label htmlFor={id}>{option.label}</label>
            </div>
          );
        })}
      </RadioCheckboxBlock>
    </Box.Root>
  );
};

export default Radio;
