import React, { useId, useState } from "react";
import { BaseBlock, InputBlock } from "../base/Base";
import type { ColorPickerProps } from "./ColorPicker.types";

/**
 * ColorPicker component - FormData-compatible color input field
 * Uses native HTML color input with name attribute for automatic FormData extraction
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
  name,
  label,
  size,
  readOnly,
  tagline,
  disabled,
  required,
  className,
  defaultValue,
  error,
  onChange,
}) => {
  const id = useId();
  const [colorValue, setColorValue] = useState(defaultValue ?? "#000000");

  const handleColorChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    setColorValue(newValue);
    onChange?.(newValue);
  };

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <InputBlock error={error} className={className}>
        <div className={`windmillui-colorpicker ${className ?? ""}`}>
          <input
            disabled={disabled ?? false}
            type="color"
            name={name}
            id={id}
            readOnly={readOnly ?? false}
            defaultValue={colorValue}
            onChange={handleColorChange}
            className="windmillui-colorpicker-input"
          />
          <span className="windmillui-colorpicker-value">{colorValue}</span>
        </div>
      </InputBlock>
    </BaseBlock>
  );
};

export default ColorPicker;
