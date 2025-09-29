import { InputContent } from "../input";

export interface AutoCompleteContent extends InputContent {
  value: string;
}

export interface DataItems {
  label: string;
  value: string;
  details?: string;
}

export interface AutoCompleteProps {
  content: AutoCompleteContent;
  setContent: React.Dispatch<React.SetStateAction<AutoCompleteContent>>;
  data: DataItems[];
  label?: string;
  disabled?: boolean;
  size?: number;
  readOnly?: boolean;
  maxLength?: number;
  placeHolder?: string;
  required?: boolean;
  className?: string;
  dataIsLoading: boolean;
}
