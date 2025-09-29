import React, { useId } from "react";
import { InputBlock } from "../base/Base";
import { CheckboxContent, CheckboxProps } from "./Checkbox.types";

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  value,
  content,
  setContent,
  disabled,
  className,
  dataIsLoading,
  noCheckbox,
  rawValue,
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
          onChange={(evt) => {
            if (rawValue) setContent(evt.target.value ?? evt.target.checked);
            else {
              if (value)
                setContent((p: CheckboxContent) => ({
                  ...p,
                  value: evt.target.value,
                }));
              else
                setContent((p: CheckboxContent) => ({
                  ...p,
                  value: evt.target.checked,
                }));
            }
          }}
          checked={
            rawValue ? (content ? true : false) : content.value ? true : false
          }
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
          onChange={(evt) => {
            if (rawValue) setContent(evt.target.value ?? evt.target.checked);
            else {
              if (value)
                setContent((p: CheckboxContent) => ({
                  ...p,
                  value: evt.target.value,
                }));
              else
                setContent((p: CheckboxContent) => ({
                  ...p,
                  value: evt.target.checked,
                }));
            }
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
