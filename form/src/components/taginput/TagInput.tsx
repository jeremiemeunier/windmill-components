import { BaseBlock, InputBlock } from "../base/Base";
import React, { useEffect, useId, useState } from "react";
import { TagInputProps } from "./TagInput.types";

const TagInput: React.FC<TagInputProps> = ({
  label,
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
  defaultValue,
  error,
  onChange,
}) => {
  const id = useId();

  const [content, setContent] = useState<string[]>(
    defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : [],
  );

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { key } = event;

    if (separator.indexOf(key) >= 0) {
      event.preventDefault();

      setContent((prev) => {
        const newValue = target.value.slice(0, -1).trim();

        if (newValue && prev.indexOf(newValue) === -1) {
          return [...prev, newValue];
        }

        return prev;
      });

      if (target.value) {
        target.value = "";
      }
    }
  };

  const handleOut = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const target = event.target as HTMLInputElement;

    setContent((prev) => {
      const newValue = target.value.trim();

      if (newValue && prev.indexOf(newValue) === -1) {
        return [...prev, newValue];
      }

      return prev;
    });

    if (target.value) {
      target.value = "";
    }
  };

  useEffect(() => {
    if (onChange) {
      const event = {
        target: {
          name,
          value: content.join(","),
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  }, [content, name, onChange]);

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <InputBlock
        error={error}
        dataIsLoading={dataIsLoading}
        subContainer={
          <div className={`windmillui-tag-root ${className}`}>
            {content.map((tag, i) => (
              <span
                className="windmillui-tag"
                title="Remove from list"
                key={i}
                onClick={() => {
                  setContent(() => content.filter((v) => v !== tag));
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        }
      >
        <input
          disabled={disabled ?? false}
          name={id}
          id={id}
          readOnly={readOnly ?? false}
          placeholder={placeHolder ? placeHolder : ""}
          autoFocus={autofocus ?? false}
          onBlur={handleOut}
          onKeyUp={handleKey}
        />
        <input name={name} type="hidden" value={content.join(",")} />
      </InputBlock>
    </BaseBlock>
  );
};

export default TagInput;
