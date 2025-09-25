import { InputProps } from "../input";

export interface CheckboxSliderContent extends InputProps {
  value: boolean;
}

export interface CheckboxSliderProps {
  label: string;
  content: CheckboxSliderContent;
  setContent: React.Dispatch<React.SetStateAction<CheckboxSliderContent>>;
  value?: string | number;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}
