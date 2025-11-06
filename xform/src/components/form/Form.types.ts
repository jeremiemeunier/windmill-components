import React, { FormEvent } from "react";

export interface FormProps {
  children: React.ReactNode;
  onSubmit: (formData: FormData, event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}
