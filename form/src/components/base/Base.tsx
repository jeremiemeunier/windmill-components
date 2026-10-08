import React from "react";
import type {
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
  className,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["windmillui-form-container"];

    if (size) str.push(`gwc-${size}`);
    if (label) str.push("template-label");
    else str.push("template-default");

    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {label ? (
        <label htmlFor={id}>
          {label}{" "}
          {required ? (
            <>
              <span className="windmillui-required" aria-hidden="true">
                *
              </span>
              <span className="sr-only">required</span>
            </>
          ) : null}
        </label>
      ) : null}
      {children}
      {tagline}
    </div>
  );
};

export const InputBlock: React.FC<InputBlockProps> = ({
  children,
  error,
  maxLength,
  className,
  dataIsLoading,
  lockWhenDataIsLoading,
  locked,
  subContainer,
}) => {
  const classNameBuilder = () => {
    const str: string[] = ["windmillui-input", "root"];

    if (error) str.push("state-negative");
    if (dataIsLoading) str.push("state-loading");
    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      <div className="input-container">
        {dataIsLoading && lockWhenDataIsLoading ? (
          <div className="windmillui-input-placeholder"></div>
        ) : (
          children
        )}
        {maxLength && maxLength.value && (
          <span className="windmillui-input-maxlength">
            {maxLength.current} / {maxLength.value}
          </span>
        )}
        {locked && locked.value && (
          <span className="windmillui-input-locked">
            <i className="icon ti ti-lock" />
            <span>{locked.message}</span>
          </span>
        )}
      </div>
      {subContainer}
      {error && typeof error === "string" && (
        <p className="input-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

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
    if (className) str.push(className);

    return str.join(" ");
  };

  return (
    <div className={classNameBuilder()}>
      {dataIsLoading ? (
        <div className="windmillui-input-placeholder"></div>
      ) : (
        children
      )}
      <i className="icon ti ti-caret-down-filled"></i>
      {error && <p className="windmillui-message">{error}</p>}
    </div>
  );
};
