import React, { useId, useRef, useState } from "react";
import { TotpInputProps } from "./TotpInput.types";
import { BaseBlock, InputBlock } from "../base/Base";

const TotpInput: React.FC<TotpInputProps> = ({
  name,
  error,
  label,
  size,
  locked,
  required,
  totpSize = 6,
  className,
  isAlphaNumeric,
}) => {
  const [values, setValues] = useState<string[]>(Array(totpSize).fill(""));
  const [content, setContent] = useState<string>("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const id = useId();

  const inputHandler = (index: number, value: string) => {
    const cleanValue = !isAlphaNumeric ? value.replace(/[^0-9]/g, "") : value;
    const newValues = [...values];

    if (cleanValue.length > 1) {
      const digits = cleanValue.slice(0, totpSize - index).split("");
      digits.forEach((digit, i) => {
        newValues[index + i] = digit;
      });
      setValues(newValues);
      setContent(newValues.join(""));
      const nextIndex = index + digits.length;
      if (nextIndex < totpSize) {
        inputsRef.current[nextIndex]?.focus();
      }
      return;
    }

    newValues[index] = cleanValue;
    setValues(newValues);
    setContent(newValues.join(""));

    if (cleanValue && index < totpSize - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    index: number,
    evt: React.ClipboardEvent<HTMLInputElement>
  ) => {
    evt.preventDefault();
    const pasteData = evt.clipboardData.getData("text");
    if (pasteData) {
      inputHandler(index, pasteData.trim());
    }
  };

  const handleKeyDown = (
    index: number,
    evt: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (evt.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <BaseBlock id={id} label={label} size={size} required={required ?? false}>
      <div
        className={`windmillui-totp-root ${
          error ? "state-negative" : ""
        } ${className}`}
      >
        <div className="totp-fields">
          {Array.from({ length: totpSize }, (_, key) => (
            <InputBlock key={key} error={error}>
              <input
                ref={(element) => {
                  inputsRef.current[key] = element;
                }}
                value={values[key]}
                autoFocus={key === 0 ? true : false}
                maxLength={1}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  inputHandler(key, event.target.value)
                }
                inputMode={isAlphaNumeric ? "text" : "numeric"}
                autoComplete="one-time-code"
                readOnly={locked ? locked : false}
                onKeyDown={(event) => handleKeyDown(key, event)}
                onPaste={(event) => handlePaste(key, event)}
              />
            </InputBlock>
          ))}
          <input type="hidden" name={name} value={content} />
        </div>
        {error && <p className="windmillui-message">{error}</p>}
      </div>
    </BaseBlock>
  );
};

export default TotpInput;
