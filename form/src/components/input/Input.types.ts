export interface InputProps {
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
  error: string;
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  type?: string;
  maxLength?: number;
  placeHolder?: string;
  locked?: boolean;
  regex?: RegExp;
  regexLabel?: string;
  required?: boolean;
  name?: string;
  autofocus?: boolean;
  className?: string;
}
