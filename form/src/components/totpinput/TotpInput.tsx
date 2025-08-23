import React, { useId, useRef, useState } from "react";
import { TotpInputProps } from "./TotpInput.types";
import { BaseBlock, InputBlock } from "../base/Base";

const TotpInput: React.FC<TotpInputProps> = ({
  label,
  setContent,
  error,
  size,
  locked,
  required,
  totpSize = 6,
  className,
}) => {
  const [values, setValues] = useState<string[]>(Array(totpSize).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const id = useId();

  const inputHandler = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
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
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pasteData = event.clipboardData.getData("text");
    if (pasteData) {
      event.preventDefault();
      inputHandler(index, pasteData.trim());
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      required={required ? true : false}
    >
      <div
        className={`windmillui-totp-root ${
          error ? "state-negative" : ""
        } ${className}`}
      >
        <div className="totp-fields">
          {Array.from({ length: totpSize }, (_, key) => (
            <InputBlock key={key} error={error ? true : false}>
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
                inputMode="numeric"
                autoComplete="one-time-code"
                readOnly={locked ? locked : false}
                onKeyDown={(event) => handleKeyDown(key, event)}
                onPaste={(event) => handlePaste(key, event)}
              />
            </InputBlock>
          ))}
        </div>
        {error && <p className="windmillui-message">{error}</p>}
      </div>
    </BaseBlock>
  );
};

export default TotpInput;
