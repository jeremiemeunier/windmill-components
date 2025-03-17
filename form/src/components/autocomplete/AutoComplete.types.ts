export interface DataItems {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  data: DataItems[];
  label?: string;
  locked?: boolean;
  size?: number;
  readOnly?: boolean;
  maxLength?: number;
  placeHolder?: string;
  required?: boolean;
  className?: string;
}
