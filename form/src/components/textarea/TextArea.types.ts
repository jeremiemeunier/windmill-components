export interface TextAreaProps {
  label?: string;
  content: any;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  error: any;
  maxLength?: number;
  size?: number;
  tagline?: React.ReactNode;
  readOnly?: boolean;
  placeHolder?: string;
  locked?: boolean;
  rows?: number;
  className?: string;
  resizable?: boolean;
}
