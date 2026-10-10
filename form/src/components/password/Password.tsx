import React, { useId, useState } from "react";
import { BaseBlock, InputBlock } from "../base/Base";
import type { PasswordProps } from "./Password.types";

const Password: React.FC<PasswordProps> = ({
  label,
  size,
  readOnly,
  tagline,
  isNew,
  placeHolder,
  disabled,
  className,
  error,
  name,
}) => {
  const id = useId();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordVerifSize, setPasswordVerifSize] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialRegex = /[!@#\$%\^\&*\)\(+=._-]/;

  const passwordHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setContent(evt.target.value);
    setPasswordVerifSize(evt.target.value.length);
  };

  return (
    <BaseBlock
      id={id}
      label={label}
      size={size}
      tagline={tagline}
      required={false}
    >
      <InputBlock error={error} className={className}>
        <div
          className={`windmillui-password ${className}`}
          onMouseLeave={() => {
            setPasswordVisibility(false);
          }}
        >
          <input
            disabled={disabled ?? false}
            type={passwordVisibility ? "text" : "password"}
            id={id}
            name={name}
            placeholder={placeHolder ? placeHolder : ""}
            onChange={passwordHandler}
            autoComplete={isNew ? "new-password" : "current-password"}
            readOnly={readOnly ? readOnly : false}
          />
          <button
            className="windmillui-password-switch"
            onClick={(event) => {
              event.preventDefault();
              setPasswordVisibility(!passwordVisibility);
            }}
          >
            <i
              className={
                passwordVisibility ? "icon ti ti-eye-closed" : "icon ti ti-eye"
              }
            ></i>
          </button>
        </div>
        {isNew ? (
          <p className="windmillui-message s-sm">
            Votre mot de passe doit respecter ces critères :
            <br />
            <span>
              {passwordVerifSize >= 8 ? (
                <i
                  className="icon color-positive s-xs ti ti-circle-check-filled
"
                ></i>
              ) : (
                <i className="icon color-negative s-xs ti ti-circle-x"></i>
              )}
              Faire au moins 8 caractères
            </span>
            <span>
              {uppercaseRegex.test(content) ? (
                <i
                  className="icon color-positive s-xs ti ti-circle-check-filled
"
                ></i>
              ) : (
                <i className="icon color-negative s-xs ti ti-circle-x"></i>
              )}
              Avoir au moins une lettre majuscule
            </span>
            <span>
              {numberRegex.test(content) ? (
                <i
                  className="icon color-positive s-xs ti ti-circle-check-filled
"
                ></i>
              ) : (
                <i className="icon color-negative s-xs ti ti-circle-x"></i>
              )}
              Avoir au moins 1 chiffre
            </span>
            <span>
              {specialRegex.test(content) ? (
                <i
                  className="icon color-positive s-xs ti ti-circle-check-filled
"
                ></i>
              ) : (
                <i className="icon color-negative s-xs ti ti-circle-x"></i>
              )}
              Avoir au moins un caractère spécial
            </span>
          </p>
        ) : (
          ""
        )}
      </InputBlock>
    </BaseBlock>
  );
};

export default Password;
