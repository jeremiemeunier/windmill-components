export interface FileInputProps {
  setContent: React.Dispatch<React.SetStateAction<null | File>>;
  error: any;
  accept: string[];
  label?: string;
  size?: number;
  tagline?: React.ReactNode;
  required?: boolean;
  className?: string;
}
