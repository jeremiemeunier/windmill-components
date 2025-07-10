import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

export interface InputProps {
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
  error: any;
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
  placeHolder?: string;
  locked?: boolean;
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
}
