export interface TagInputProps {
  content: string[];
  setContent: React.Dispatch<React.SetStateAction<string[]>>;
  error: any;
  separator?: string[];
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  placeHolder?: string;
  locked?: boolean;
  required?: boolean;
  name?: string;
  autofocus?: boolean;
  className?: string;
}
