import {
  BaseBlockProps,
  InputBlockProps,
  RadioCheckboxBlockProps,
  SelectBlockProps,
} from "./Base.types";

export const BaseBlock: React.FC<BaseBlockProps> = ({
  id,
  size,
  label,
  tagline,
  children,
  required,
}) => {
  return (
    <div
      className={`windmillui-form-container ${size ? `gwc-${size}` : ""} ${
        label ? "template-label" : "template-default"
      }`}
    >
      {label ? (
        <label htmlFor={id}>
          {label}{" "}
          {required && <span className="windmillui-required">Requis</span>}
        </label>
      ) : (
        ""
      )}
      {children}
      {tagline && tagline}
    </div>
  );
};

export const InputBlock: React.FC<InputBlockProps> = ({
  children,
  error,
  maxLength,
  className,
}) => {
  return (
    <div
      className={`windmillui-input ${error ? "state-negative" : ""} ${
        maxLength ? "template-max-length" : ""
      } ${className}`}
    >
      {children}
      {error && typeof error === "string" && (
        <p className="windmillui-message">{error}</p>
      )}
    </div>
  );
};

export const RadioCheckboxBlock: React.FC<RadioCheckboxBlockProps> = ({
  children,
  error,
  gridSize,
  className,
}) => {
  return (
    <div className={`windmillui-container ${className}`}>
      <div
        className={`windmillui-radio-grid ${
          error ? "state-negative" : ""
        } grid rgs-8 cgs-8 tc-${gridSize}`}
      >
        {children}
      </div>
      {error && <p className="windmillui-message">{error}</p>}
    </div>
  );
};

export const SelectBlock: React.FC<SelectBlockProps> = ({
  children,
  error,
  className,
}) => {
  return (
    <div
      className={`windmillui-input windmillui-select ${
        error ? "state-negative" : ""
      } ${className}`}
    >
      {children}
      <i className="icon windmill-icon-chevron-down"></i>
      {error ? <p className="windmillui-message">{error}</p> : ""}
    </div>
  );
};
