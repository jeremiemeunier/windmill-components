export interface DataItems {
  [key: string]: any;
  label: string;
  value: string;
  details?: string;
}

export interface AutoCompleteProps {
  name: string;
  label?: string;
  placeHolder?: string;
  data: DataItems[];
  disabled?: boolean;
  size?: number;
  readOnly?: boolean;
  maxLength?: number;
  required?: boolean;
  autofocus?: boolean;
  className?: string;
  dataIsLoading: boolean;
  defaultValue?: string | number;
  error?: string;
  labelKey?: string;
  valueKey?: string;
}
