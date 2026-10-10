export interface TagInputProps {
  name: string;
  separator?: string[];
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  autofocus?: boolean;
  className?: string;
  dataIsLoading?: boolean;
  defaultValue?: string[];
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
