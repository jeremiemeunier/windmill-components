import React from "react";
import { FormProps } from "./Form.types";

/**
 * Form component - A FormData-focused form wrapper
 * Automatically extracts FormData from form submission and passes it to the onSubmit handler
 */
const Form: React.FC<FormProps> = ({ children, onSubmit, className }) => {
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
    >
      {children}
    </form>
  );
};

export default Form;
