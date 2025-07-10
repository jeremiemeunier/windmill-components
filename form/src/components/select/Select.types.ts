export interface SelectProps {
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
  children: React.ReactNode;
  error: any;
  label?: string;
  size?: number;
  locked?: boolean;
  className?: string;
  name?: string;
}
