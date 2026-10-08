import React from "react";
import type { FormProps } from "./Form.types";

/**
 * Form component - A FormData-focused form wrapper
 * Automatically extracts FormData from form submission and passes it to the onSubmit handler
 */
const Form: React.FC<FormProps> = ({ children, onSubmit, className, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData, event);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={`windmillui-form ${className || ""}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </form>
  );
};

export default Form;
