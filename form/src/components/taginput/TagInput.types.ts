import { InputContent } from "../input";

export interface TagInputContent extends InputContent {
  value: string[];
}

export interface TagInputProps {
  content: TagInputContent;
  setContent: React.Dispatch<React.SetStateAction<TagInputContent>>;
  separator?: string[];
  label?: string;
  size?: number;
  readOnly?: boolean;
  tagline?: React.ReactNode;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  autofocus?: boolean;
  className?: string;
  dataIsLoading?: boolean;
}
