export interface TotpInputProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  error: any;
  label?: string;
  size?: number;
  locked?: boolean;
  required?: boolean;
  totpSize?: number;
  className?: string;
}
