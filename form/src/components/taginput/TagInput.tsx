import { BaseBlock, InputBlock } from "../base/Base";
import React, { useId } from "react";
import { TagInputProps } from "./TagInput.types";

const Input: React.FC<TagInputProps> = ({
  label,
  content,
  setContent,
  size,
  readOnly,
  tagline,
  placeHolder,
  disabled,
  required,
  name,
  autofocus,
  separator = [","],
  className,
  dataIsLoading,
}) => {
  const id = useId();

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { key } = event;

    if (separator.indexOf(key) >= 0) {
      setContent((p) => ({
        ...p,
        value: [...content.value, target.value.slice(0, -1).trim()],
      }));
      target.value = "";
    }
  };

  const handleOut = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const target = event.target as HTMLInputElement;

    if (target.value) {
      setContent((p) => ({
        ...p,
        value: [...content.value, target.value.slice(0, -1).trim()],
      }));
      target.value = "";
    }
  };

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <InputBlock
        error={content.error && content.message}
        dataIsLoading={dataIsLoading}
      >
        <input
          disabled={disabled ?? false}
          name={name ? name : id}
          id={id}
          readOnly={readOnly ?? false}
          placeholder={placeHolder ? placeHolder : ""}
          autoFocus={autofocus ?? false}
          onBlur={handleOut}
          onKeyUp={handleKey}
        />
        <div className={`windmillui-tag-root ${className}`}>
          {content.value.map((tag, i) => (
            <span
              className="windmillui-tag"
              title="Remove from list"
              key={i}
              onClick={() => {
                setContent((p) => ({
                  ...p,
                  value: content.value.filter((v) => v !== tag),
                }));
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </InputBlock>
    </BaseBlock>
  );
};

export default Input;
