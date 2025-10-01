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
  disabled,
}) => {
  const id = useId();

  const classBuilder = (special?: string) => {
    const str = ["windmillui-radio"];

    if (!viewBox) str.push("template-no-check");
    if (special) str.push(special);

    return str.join(" ");
  };

  return (
    <BaseBlock id={id} label={label} size={size}>
      <RadioCheckboxBlock
        className={className}
        gridSize={gridSize}
        error={content.error && content.message}
      >
        {values.map((value: RadioValues, key) => {
          const _id = useId();

          return (
            <div key={key} className={classBuilder(value.classname)}>
              <input
                type="radio"
                id={_id}
                onChange={(evt) => {
                  setContent((p) => ({ ...p, value: evt.target.value }));
                }}
                checked={content.value === value.id ? true : false}
                disabled={disabled || value?.disabled ? true : false}
                value={value.id}
                name={_id}
              />
              <label htmlFor={_id}>{value.label}</label>
            </div>
          );
        })}
      </RadioCheckboxBlock>
    </BaseBlock>
  );
};

export default Radio;
