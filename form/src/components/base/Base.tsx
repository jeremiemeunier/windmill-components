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
      className={`teaui form-container ${size ? `gwc-${size}` : ""} ${
        label ? "template-label" : "template-default"
      }`}
    >
      {label ? (
        <label htmlFor={id}>
          {label} {required && <span className="teaui required">Requis</span>}
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
      className={`teaui form-input ${error ? "state-negative" : ""} ${
        maxLength ? "schema-max-length" : ""
      } ${className}`}
    >
      {children}
      {error && typeof error === "string" && (
        <p className="teaui form-message">{error}</p>
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
    <div className={`teaui form-container ${className}`}>
      <div
        className={`teaui form-radio-grid ${
          error ? "state-negative" : ""
        } grid-init row-gap-size-8 column-gap-size-8 template-${gridSize}col`}
      >
        {children}
      </div>
      {error && <p className="teaui form-message">{error}</p>}
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
      className={`teaui form-input form-select ${
        error ? "state-negative" : ""
      } ${className}`}
    >
      {children}
      <i className="icon teaui-icon-chevron-down"></i>
      {error ? <p className="teaui form-message">{error}</p> : ""}
    </div>
  );
};
