import React, { useId } from "react";
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
  dataIsLoading,
  noCheckbox,
}) => {
  const id = useId();

  if (noCheckbox)
    return (
      <div
        className={
          noCheckbox ? `windmillui-checkbox-no-check` : `windmillui-checkbox`
        }
      >
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
    );

  return (
    <InputBlock
      error={error}
      className={className}
      dataIsLoading={dataIsLoading}
    >
      <div className={`windmillui-checkbox`}>
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
