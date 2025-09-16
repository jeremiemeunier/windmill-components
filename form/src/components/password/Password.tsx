import { PasswordProps } from "./Password.types";
import React, { useId, useState } from "react";
import { BaseBlock, InputBlock } from "../base/Base";

const Password: React.FC<PasswordProps> = ({
  label,
  content,
  setContent,
  size,
  readOnly,
  tagline,
  isNew,
  placeHolder,
  disabled,
  className,
}) => {
  const id = useId();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordVerifSize, setPasswordVerifSize] = useState<number>(0);

  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialRegex = /[!@#\$%\^\&*\)\(+=._-]/;

  const passwordHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setContent((p) => ({ ...p, value: evt.target.value }));
    setPasswordVerifSize(evt.target.value.length);
  };

  return (
    <BaseBlock id={id} label={label} tagline={tagline} size={size}>
      <InputBlock
        error={content.error && content.message}
        className={className}
      >
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
            name={id}
            placeholder={placeHolder ? placeHolder : ""}
            onChange={passwordHandler}
            value={content.value}
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
                passwordVisibility
                  ? "icon dtc-icon-hidden-eye"
                  : "icon dtc-icon-eye"
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
                <i className="icon color-positive s-xs windmill-icon-check-circle-fill"></i>
              ) : (
                <i className="icon color-negative s-xs windmill-icon-cross-circle"></i>
              )}
              Faire au moins 8 caractères
            </span>
            <span>
              {uppercaseRegex.test(content.value) ? (
                <i className="icon color-positive s-xs windmill-icon-check-circle-fill"></i>
              ) : (
                <i className="icon color-negative s-xs windmill-icon-cross-circle"></i>
              )}
              Avoir au moins une lettre majuscule
            </span>
            <span>
              {numberRegex.test(content.value) ? (
                <i className="icon color-positive s-xs windmill-icon-check-circle-fill"></i>
              ) : (
                <i className="icon color-negative s-xs windmill-icon-cross-circle"></i>
              )}
              Avoir au moins 1 chiffre
            </span>
            <span>
              {specialRegex.test(content.value) ? (
                <i className="icon color-positive s-xs windmill-icon-check-circle-fill"></i>
              ) : (
                <i className="icon color-negative s-xs windmill-icon-cross-circle"></i>
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
