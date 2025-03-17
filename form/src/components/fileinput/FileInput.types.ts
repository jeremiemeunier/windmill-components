export interface FileInputProps {
  setContent: React.Dispatch<React.SetStateAction<null | FileList | File>>;
  error: string;
  accept: string[];
  label?: string;
  size?: number;
  tagline?: React.ReactNode;
  required?: boolean;
  className?: string;
}
