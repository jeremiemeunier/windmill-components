import { PasswordProps } from "./Password.types";
import { useId, useState } from "react";
import { BaseBlock, InputBlock } from "../base/Base";

const Password: React.FC<PasswordProps> = ({
  label,
  content,
  setContent,
  error,
  size,
  readOnly,
  tagline,
  isNew,
  placeHolder,
  locked,
  className,
}) => {
  const id = useId();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordVerifSize, setPasswordVerifSize] = useState<number>(0);

  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialRegex = /[!@#\$%\^\&*\)\(+=._-]/;

  const passwordHandler = (event: any) => {
    setContent(event.target.value);
    setPasswordVerifSize(event.target.value.length);
  };

  return (
    <BaseBlock id={id} label={label} tagline={tagline} size={size}>
      <InputBlock error={error} className={className}>
        <div
          className={`infusedui-password ${className}`}
          onMouseLeave={() => {
            setPasswordVisibility(false);
          }}
        >
          <input
            disabled={locked ? locked : false}
            type={passwordVisibility ? "text" : "password"}
            id={id}
            name={id}
            placeholder={placeHolder ? placeHolder : ""}
            onChange={passwordHandler}
            value={content}
            readOnly={readOnly ? readOnly : false}
          />
          <button
            className="infusedui-password-switch"
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
          <p className="infusedui-message s-sm">
            Votre mot de passe doit respecter ces critères :
            <br />
            <span>
              {passwordVerifSize >= 8 ? (
                <i className="icon color-positive s-xs teaui-icon-check-circle-fill"></i>
              ) : (
                <i className="icon color-negative s-xs teaui-icon-cross-circle"></i>
              )}
              Faire au moins 8 caractères
            </span>
            <span>
              {uppercaseRegex.test(content) ? (
                <i className="icon color-positive s-xs teaui-icon-check-circle-fill"></i>
              ) : (
                <i className="icon color-negative s-xs teaui-icon-cross-circle"></i>
              )}
              Avoir au moins une lettre majuscule
            </span>
            <span>
              {numberRegex.test(content) ? (
                <i className="icon color-positive s-xs teaui-icon-check-circle-fill"></i>
              ) : (
                <i className="icon color-negative s-xs teaui-icon-cross-circle"></i>
              )}
              Avoir au moins 1 chiffre
            </span>
            <span>
              {specialRegex.test(content) ? (
                <i className="icon color-positive s-xs teaui-icon-check-circle-fill"></i>
              ) : (
                <i className="icon color-negative s-xs teaui-icon-cross-circle"></i>
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
