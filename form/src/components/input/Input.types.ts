import React, {
  type HTMLInputAutoCompleteAttribute,
  type HTMLInputTypeAttribute,
} from "react";
import { InputLocker } from "../base/Base.types";

export interface InputProps {
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
  dataIsLoading?: boolean;
  error?: string;
  regex?: {
    value: RegExp;
    message: string;
    type: "required" | "rejected";
  };
  locked?: InputLocker;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
