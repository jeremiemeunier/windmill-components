export interface CheckboxSliderProps {
  label: string;
  error: any;
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
  value?: string | number;
  locked?: boolean;
  className?: string;
  loading?: boolean;
}
