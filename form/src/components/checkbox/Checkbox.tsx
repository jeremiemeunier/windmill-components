import { useId } from "react";
import { InputBlock } from "../base/Base";
import { CheckboxProps } from "./Checkbox.types";

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  error,
  value,
  content,
  setContent,
  locked,
  className,
}) => {
  const id = useId();

  return (
    <InputBlock error={error} className={className}>
      <div className={`infusedui-checkbox`}>
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
        <label htmlFor={id}>{children}</label>
      </div>
    </InputBlock>
  );
};

export default Checkbox;
