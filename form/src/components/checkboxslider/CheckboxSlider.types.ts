import { InputContent } from "../input";

export interface CheckboxSliderContent extends InputContent {
  value: boolean;
}

export interface CheckboxSliderProps {
  label: string;
  content: CheckboxSliderContent;
  setContent: React.Dispatch<React.SetStateAction<CheckboxSliderContent>>;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}
