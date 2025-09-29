import React, {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from "react";

export interface InputContent {
  error: boolean;
  message: string;
  value: any | null;
}

export interface InputProps {
  content: InputContent;
  setContent: React.Dispatch<React.SetStateAction<InputContent>>;
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
  placeHolder?: string;
  disabled?: boolean;
  regex?: RegExp;
  regexLabel?: string;
  required?: boolean;
  name?: string;
  autofocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  dataIsLoading?: boolean;
}
