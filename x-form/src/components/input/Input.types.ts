import React, {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from "react";

export interface XInputProps {
  name: string;
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autofocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number;
  error?: string;
}
