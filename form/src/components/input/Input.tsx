import { InputProps } from "./Input.types";
import { BaseBlock, InputBlock } from "../base/Base";
import React, { useEffect, useId, useState } from "react";

const Input: React.FC<InputProps> = ({
  label,
  content,
  setContent,
  size,
  readOnly,
  tagline,
  type,
  maxLength,
  placeHolder,
  disabled,
  regex,
  regexLabel,
  required,
  name,
  autofocus,
  autoComplete,
  className,
  min,
  max,
  step,
  dataIsLoading,
}) => {
  const id = useId();
  const [actualContentSize, setActualContentSize] = useState(
    content?.value?.length ?? 0
  );

  const [internError, setInternError] = useState("");

  useEffect(() => {
    setActualContentSize(content?.value?.length ?? 0);
  }, [content]);

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ?? false}
    >
      <InputBlock
        error={(content.error && content.message) || internError}
        maxLength={maxLength}
        className={className}
        dataIsLoading={dataIsLoading}
      >
        <input
          disabled={disabled ?? false}
          type={type ?? "text"}
          value={content.value}
          name={name ? name : id}
          id={id}
          readOnly={readOnly ?? false}
          maxLength={maxLength && maxLength}
          placeholder={placeHolder ? placeHolder : ""}
          autoFocus={autofocus ?? false}
          min={min && min}
          max={max && max}
          step={step && step}
          autoComplete={autoComplete && autoComplete}
          onChange={(evt) => {
            setContent((p) => ({ ...p, value: evt.target.value }));

            if (evt.target.value) setActualContentSize(evt.target.value.length);
            if (regex && regex.test(evt.target.value))
              setInternError(
                `Votre saisie ne doit pas contenir les caractères suivants : ${regexLabel}`
              );
            else setInternError("");
          }}
        />
        {maxLength && (
          <span className="windmillui-max-length">
            {actualContentSize} / {maxLength}
          </span>
        )}
      </InputBlock>
    </BaseBlock>
  );
};

export default Input;
