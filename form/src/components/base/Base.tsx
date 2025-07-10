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
      className={`infusedui-form-container ${size ? `gwc-${size}` : ""} ${
        label ? "template-label" : "template-default"
      }`}
    >
      {label ? (
        <label htmlFor={id}>
          {label}{" "}
          {required && <span className="infusedui-required">Requis</span>}
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
      className={`infusedui-input ${error ? "state-negative" : ""} ${
        maxLength ? "template-max-length" : ""
      } ${className}`}
    >
      {children}
      {error && typeof error === "string" && (
        <p className="infusedui-message">{error}</p>
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
    <div className={`infusedui-container ${className}`}>
      <div
        className={`infusedui-radio-grid ${
          error ? "state-negative" : ""
        } grid rgs-8 cgs-8 tc-${gridSize}`}
      >
        {children}
      </div>
      {error && <p className="infusedui-message">{error}</p>}
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
      className={`infusedui-input infusedui-select ${
        error ? "state-negative" : ""
      } ${className}`}
    >
      {children}
      <i className="icon teaui-icon-chevron-down"></i>
      {error ? <p className="infusedui-message">{error}</p> : ""}
    </div>
  );
};
