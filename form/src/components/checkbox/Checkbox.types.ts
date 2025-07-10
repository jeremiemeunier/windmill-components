export interface CheckboxProps {
  children: React.ReactNode;
  error: any;
  content: any;
  setContent: React.Dispatch<React.SetStateAction<any>>;
  value?: string | number;
  locked?: boolean;
  className?: string;
}
