import { InputContent } from "../input";

export interface PasswordContent extends InputContent {
  value: string;
}

export interface PasswordProps {
  label: string;
  content: PasswordContent;
  setContent: React.Dispatch<React.SetStateAction<PasswordContent>>;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  isNew?: boolean;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
  controls?: {};
}
