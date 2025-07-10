import { TotpInputProps } from "./TotpInput.types";
import { BaseBlock, InputBlock } from "../base/Base";
import { useId, useRef, useState } from "react";

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
    if (/[^0-9]/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    setContent(newValues.join(""));

    // Auto-focus next input if available
    if (value && index < totpSize - 1) {
      inputsRef.current[index + 1]?.focus();
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
        className={`infusedui-totp-root ${
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
                autoComplete="one-time-code"
                readOnly={locked ? locked : false}
                onKeyDown={(event) => handleKeyDown(key, event)}
              />
            </InputBlock>
          ))}
        </div>
        {error && <p className="infusedui-message">{error}</p>}
      </div>
    </BaseBlock>
  );
};

export default TotpInput;
