export interface ColorPickerProps {
  name: string;
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  error?: string;
  onChange?: (value: string) => void;
}
