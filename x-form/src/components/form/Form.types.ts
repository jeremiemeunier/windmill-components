import React, { FormEvent } from "react";

export interface XFormProps {
  children: React.ReactNode;
  onSubmit: (formData: FormData, event: FormEvent<HTMLFormElement>) => void;
  className?: string;
}
