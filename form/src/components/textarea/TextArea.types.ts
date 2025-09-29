import { InputContent } from "../input";

export interface TextAreaContent extends InputContent {
  value: string;
}

export interface TextAreaProps {
  label?: string;
  content: TextAreaContent;
  setContent: React.Dispatch<React.SetStateAction<TextAreaContent>>;
  maxLength?: number;
  size?: number;
  tagline?: React.ReactNode;
  readOnly?: boolean;
  placeHolder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  resizable?: boolean;
  dataIsLoading?: boolean;
}
