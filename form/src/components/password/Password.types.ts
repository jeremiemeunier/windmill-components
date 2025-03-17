export interface PasswordProps {
  label: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  isNew?: boolean;
  placeHolder?: string;
  locked?: boolean;
  className?: string;
}
