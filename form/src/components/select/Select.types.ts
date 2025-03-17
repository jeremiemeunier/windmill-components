export interface SelectProps {
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
  children: React.ReactNode;
  error: string;
  label?: string;
  size?: number;
  locked?: boolean;
  className?: string;
  name?: string;
}
