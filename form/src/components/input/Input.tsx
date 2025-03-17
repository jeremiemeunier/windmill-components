import { InputProps } from "./Input.types";
import { BaseBlock, InputBlock } from "../base/Base";
import { useEffect, useId, useState } from "react";

const Input: React.FC<InputProps> = ({
  label,
  content,
  setContent,
  error,
  size,
  readOnly,
  tagline,
  type,
  maxLength,
  placeHolder,
  locked,
  regex,
  regexLabel,
  required,
  name,
  autofocus,
  className,
}) => {
  const id = useId();
  const [actualContentSize, setActualContentSize] = useState(
    content?.length || 0
  );

  const [internError, setInternError] = useState("");

  useEffect(() => {
    setActualContentSize(content?.length || 0);
  }, [content]);

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={required ? true : false}
    >
      <InputBlock
        error={error || internError}
        maxLength={maxLength}
        className={className}
      >
        <input
          disabled={locked ? true : false}
          type={type ? type : "text"}
          value={content}
          name={name ? name : id}
          id={id}
          readOnly={readOnly ? true : false}
          maxLength={maxLength && maxLength}
          placeholder={placeHolder ? placeHolder : ""}
          autoFocus={autofocus ? true : false}
          onChange={(event) => {
            setContent(event.target.value);

            if (event.target.value) {
              setActualContentSize(event.target.value.length);
            }

            if (regex && regex.test(event.target.value)) {
              setInternError(
                `Votre saisie ne doit pas contenir les caractères suivants : ${regexLabel}`
              );
            } else {
              setInternError("");
            }
          }}
        />
        {maxLength && (
          <span className="form-max-length">
            {actualContentSize} / {maxLength}
          </span>
        )}
      </InputBlock>
    </BaseBlock>
  );
};

export default Input;
