export interface PasswordProps {
  name: string;
  label: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  isNew?: boolean;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
  controls?: {};
  error?: string;
}
