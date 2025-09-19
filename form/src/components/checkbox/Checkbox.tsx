import React, { useId } from "react";
import { InputBlock } from "../base/Base";
import { CheckboxProps } from "./Checkbox.types";

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  value,
  content,
  setContent,
  disabled,
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
            if (value) setContent((p) => ({ ...p, value: event.target.value }));
            else setContent((p) => ({ ...p, value: event.target.checked }));
          }}
          checked={content.value ? true : false}
          disabled={disabled ?? false}
        />
        <label htmlFor={id}>{children}</label>
      </div>
    );

  return (
    <InputBlock
      error={content.error && content.message}
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
            if (value) setContent((p) => ({ ...p, value: event.target.value }));
            else setContent((p) => ({ ...p, value: event.target.checked }));
          }}
          checked={content.value ? true : false}
          disabled={disabled ?? false}
        />
        <label htmlFor={id}>{children}</label>
      </div>
    </InputBlock>
  );
};

export default Checkbox;
