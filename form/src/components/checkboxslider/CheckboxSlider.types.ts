import { CheckboxContent } from "../checkbox/Checkbox.types";

export interface CheckboxSliderProps {
  label: string;
  content: CheckboxContent;
  setContent: React.Dispatch<React.SetStateAction<CheckboxContent>>;
  value?: string | number;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}
