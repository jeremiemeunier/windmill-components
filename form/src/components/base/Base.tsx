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
  const classNameBuilder = () => {
    const str: string[] = ["windmillui-form-container"];

    if (size) str.push(`gwc-${size}`);
    if (label) str.push("template-label");
    else str.push("template-default");

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
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
  dataIsLoading,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["windmillui-input"];

    if (error) str.push("state-negative");
    if (dataIsLoading) str.push("state-loading");
    if (maxLength) str.push("template-max-length");

    return className ? str.join(" ") + " " + className : str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {dataIsLoading ? (
        <div className="windmillui-input-placeholder"></div>
      ) : (
        children
      )}
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
    <div className={`windmillui-container ${className ?? ""}`}>
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
  dataIsLoading,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["windmillui-input", "windmillui-select"];

    if (error) str.push("state-negative");
    if (dataIsLoading) str.push("state-loading");

    return className ? str.join(" ") + " " + className : str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {children}
      <i className="icon windmill-icon-chevron-down"></i>
      {error ? <p className="windmillui-message">{error}</p> : ""}
    </div>
  );
};
