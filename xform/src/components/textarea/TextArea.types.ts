import React from "react";

export interface TextAreaProps {
  name: string;
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  rows?: number;
  defaultValue?: string;
  error?: string;
}
