import { useId } from "react";
import { CheckboxSliderProps } from "./CheckboxSlider.types";

const CheckboxSlider: React.FC<CheckboxSliderProps> = ({
  label,
  error,
  value,
  content,
  setContent,
  locked,
  className,
  loading,
}) => {
  const id = useId();

  return (
    <div className={`infusedui-slider ${loading ? "state-loader" : ""}`}>
      <input
        type="checkbox"
        name={id}
        id={id}
        value={value}
        onChange={(event) => {
          if (value) {
            setContent(event.target.value);
          } else {
            setContent(event.target.checked);
          }
        }}
        checked={content ? true : false}
        disabled={locked ? locked : false}
      />
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default CheckboxSlider;
