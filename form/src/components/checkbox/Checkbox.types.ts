import { InputContent } from "../input";

export interface CheckboxContent extends InputContent {
  value: string | number | boolean;
}

export interface CheckboxProps {
  children: React.ReactNode;
  content: CheckboxContent;
  setContent: React.Dispatch<React.SetStateAction<CheckboxContent>>;
  value?: string | number;
  disabled?: boolean;
  className?: string;
  dataIsLoading?: boolean;
  noCheckbox?: boolean;
}
