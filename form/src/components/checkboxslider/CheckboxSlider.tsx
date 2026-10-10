import React, { useId } from "react";
import { CheckboxSliderProps } from "./CheckboxSlider.types";

const CheckboxSlider: React.FC<CheckboxSliderProps> = ({
  label,
  name,
  disabled,
  className,
  loading,
  defaultValue,
  onChange,
}) => {
  const id = useId();

  const classBuilder = () => {
    const str = ["windmillui-slider"];

    if (loading) str.push("state-loading");
    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classBuilder()}>
      <input
        type="checkbox"
        name={name ?? id}
        id={id}
        defaultChecked={defaultValue}
        disabled={disabled ?? false}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor={id} className={loading ? "text state-loading" : ""}>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default CheckboxSlider;
