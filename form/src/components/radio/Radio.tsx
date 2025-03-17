import { useId } from "react";
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
  error,
  className,
}) => {
  const id = useId();

  return (
    <BaseBlock id={id} label={label} size={size}>
      <RadioCheckboxBlock
        className={className}
        gridSize={gridSize}
        error={error}
      >
        {values.map((value: RadioValues, key) => (
          <div
            key={key}
            className={`teaui ${
              viewBox ? "form-radio" : "form-radio-no-check"
            } ${className}`}
          >
            <input
              type="radio"
              id={value.id}
              onChange={(event) => {
                setContent(event.target.value);
              }}
              checked={content === value.id ? true : false}
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
