import React, { FormEvent } from "react";

export interface FormHandler {
  (formData: FormData, event: FormEvent<HTMLFormElement>): void;
}

export interface FormProps {
  children: React.ReactNode;
  onSubmit: FormHandler;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
