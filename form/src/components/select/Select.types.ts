import { InputContent } from "../input";

export interface SelectContent extends InputContent {
  value: string;
}

export interface SelectProps {
  content: SelectContent;
  setContent: React.Dispatch<React.SetStateAction<SelectContent>>;
  children: React.ReactNode;
  label?: string;
  size?: number;
  disabled?: boolean;
  className?: string;
  name?: string;
  dataIsLoading?: boolean;
}
