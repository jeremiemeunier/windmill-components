import { SelectProps } from "./Select.types";
import { BaseBlock, SelectBlock } from "../base/Base";
import React, { useId } from "react";

const Select: React.FC<SelectProps> = ({
  label,
  content,
  setContent,
  size,
  children,
  disabled,
  className,
  name,
  dataIsLoading,
}) => {
  const id = useId();

  return (
    <BaseBlock id={id} label={label} size={size}>
      <SelectBlock
        error={content.error ?? content.message}
        className={className}
        dataIsLoading={dataIsLoading}
      >
        <select
          value={content.value}
          name={name ? name : id}
          id={id}
          onChange={(evt) => {
            setContent((p) => ({ ...p, value: evt.target.value }));
          }}
          disabled={disabled ?? false}
          className={className}
        >
          {children}
        </select>
      </SelectBlock>
    </BaseBlock>
  );
};

export default Select;
