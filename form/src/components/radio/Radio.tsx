import React, { useId } from "react";
import { BaseBlock, RadioCheckboxBlock } from "../base/Base";
import { RadioProps, RadioValues } from "./Radio.types";

const Radio: React.FC<RadioProps> = ({
  viewBox = true,
  label,
  gridSize = 4,
  size,
  values,
  content,
  setContent,
  className,
}) => {
  const id = useId();

  return (
    <BaseBlock id={id} label={label} size={size}>
      <RadioCheckboxBlock
        className={className}
        gridSize={gridSize}
        error={content.error && content.message}
      >
        {values.map((value: RadioValues, key) => (
          <div
            key={key}
            className={`${
              viewBox
                ? "windmillui-template-radio"
                : "windmillui-template-radio-no-check"
            } ${className}`}
          >
            <input
              type="radio"
              id={value.id}
              onChange={(evt) => {
                setContent((p) => ({ ...p, value: evt.target.value }));
              }}
              checked={content.value === value.id ? true : false}
              disabled={value?.disabled ? value.disabled : false}
              value={value.id}
              name={id}
            />
            <label htmlFor={value.id}>{value.label}</label>
          </div>
        ))}
      </RadioCheckboxBlock>
    </BaseBlock>
  );
};

export default Radio;
