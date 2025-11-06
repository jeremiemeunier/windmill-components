import { InputContent } from "../input";

export interface RadioContent extends InputContent {
  value: string | number;
}

export interface RadioValues {
  id: string | undefined;
  label: string;
  disabled?: boolean;
  classname?: string;
}

export interface RadioProps {
  gridSize: number;
  values: RadioValues[];
  content: RadioContent;
  setContent: React.Dispatch<React.SetStateAction<RadioContent>>;
  viewBox?: boolean;
  label?: string;
  size?: number;
  className?: string;
  disabled?: boolean;
}
