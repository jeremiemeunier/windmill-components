export interface TotpInputProps {
  name: string;
  error: string | undefined;
  label?: string;
  size?: number;
  locked?: boolean;
  required?: boolean;
  totpSize?: number;
  className?: string;
  isAlphaNumeric?: boolean;
}
