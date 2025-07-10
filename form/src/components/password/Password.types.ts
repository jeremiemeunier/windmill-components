export interface PasswordProps {
  label: string;
  content: any;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  error: any;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  isNew?: boolean;
  placeHolder?: string;
  locked?: boolean;
  className?: string;
}
