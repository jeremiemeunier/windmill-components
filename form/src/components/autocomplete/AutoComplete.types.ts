export interface DataItems {
  label: string;
  value: string;
  details?: string;
}

export interface AutoCompleteProps {
  content: any;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  error: any;
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
