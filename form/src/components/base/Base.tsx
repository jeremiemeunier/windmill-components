import React from "react";
import type {
  BaseBlockProps,
  InputBlockProps,
  RadioCheckboxBlockProps,
  SelectBlockProps,
} from "./Base.types";

export const Box = () => {};

const Root: React.FC<BaseBlockProps> = ({
  id,
  label,
  tagline,
  required,
  className,
  children,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["input-root"];

    if (label) str.push("template-label");
    if (tagline) str.push("template-tagline");
    if (!label && !tagline) str.push("template-default");

    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {label ? (
        <label htmlFor={id} className="input-label">
          {label}{" "}
          {required ? (
            <span className="input-required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {tagline}
    </div>
  );
};
Box.Root = Root;

export const RadioCheckboxBlock: React.FC<RadioCheckboxBlockProps> = ({
  children,
  error,
  gridSize,
  className,
  dataIsLoading,
}) => {
  const classNameBuilder = ({
    base,
    block,
  }: {
    base?: string;
    block?: "base" | "grid";
  }) => {
    const str: string[] = ["windmillui", base ? base : "windmillui-container"];

    if (block === "grid") {
      if (error) str.push("state-negative");
      if (gridSize) {
        str.push("grid");
        str.push("rgs-8");
        str.push("cgs-8");
        str.push(`tc-${gridSize}`);
      }
    } else {
      if (className) str.push(className);
    }

    if (dataIsLoading) str.push("state-loading");

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder({})}>
      <div
        className={classNameBuilder({
          base: "windmillui-radio-grid",
          block: "grid",
        })}
      >
        {dataIsLoading ? (
          <div className="windmillui-input-placeholder"></div>
        ) : (
          children
        )}
      </div>
      {error && <p className="windmillui-message">{error}</p>}
    </div>
  );
};

const CheckboxRadioBox: React.FC<InputBlockProps> = ({
  children,
  error,
  className,
  dataIsLoading,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["input-dock", "input-box", "type-checkbox-radio"];

    if (error) str.push("state-negative");
    if (dataIsLoading) str.push("state-loading");
    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {dataIsLoading ? <div className="input-placeholder"></div> : children}
      {error && <p className="input-message">{error}</p>}
    </div>
  );
};
Box.CheckboxRadio = CheckboxRadioBox;

const InputBox: React.FC<InputBlockProps> = ({
  children,
  error,
  className,
  dataIsLoading,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["input-dock", "input-box", "type-generic"];

    if (error) str.push("state-negative");
    if (dataIsLoading) str.push("state-loading");
    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {dataIsLoading ? <div className="input-placeholder"></div> : children}
      {error && <p className="input-message">{error}</p>}
    </div>
  );
};
Box.Input = InputBox;

const SelectBox: React.FC<SelectBlockProps> = ({
  children,
  error,
  className,
  dataIsLoading,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["input-dock", "select-dock"];

    if (error) str.push("state-negative");
    if (dataIsLoading) str.push("state-loading");
    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {dataIsLoading ? <div className="input-placeholder"></div> : children}
      <i className="icon ti ti-chevron-down"></i>
      {error && <p className="input-message">{error}</p>}
    </div>
  );
};
Box.Select = SelectBox;
