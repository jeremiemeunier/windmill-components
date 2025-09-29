import React, { useId } from "react";
import { CheckboxSliderProps } from "./CheckboxSlider.types";

const CheckboxSlider: React.FC<CheckboxSliderProps> = ({
  label,
  content,
  setContent,
  disabled,
  className,
  loading,
}) => {
  const id = useId();

  const classBuilder = () => {
    const str = ["windmillui-slider"];

    if (loading) str.push("state-loader");
    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classBuilder()}>
      <input
        type="checkbox"
        name={id}
        id={id}
        onChange={(event) => {
          setContent((p) => ({ ...p, value: event.target.checked }));
        }}
        checked={content.value}
        disabled={disabled ?? false}
      />
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default CheckboxSlider;
