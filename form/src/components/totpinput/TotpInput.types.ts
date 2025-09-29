import { InputContent } from "../input";

export interface TotpContent extends InputContent {
  value: string;
}

export interface TotpInputProps {
  content: TotpContent;
  setContent: React.Dispatch<React.SetStateAction<TotpContent>>;
  label?: string;
  size?: number;
  locked?: boolean;
  required?: boolean;
  totpSize?: number;
  className?: string;
  isAlphaNumeric?: boolean;
}
