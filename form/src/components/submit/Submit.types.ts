export interface SubmitProps {
  size?: number;
  loading: boolean;
  label: string;
  otherAction?: {
    link: string;
    iconHide: boolean;
    visible: boolean;
    icon: string;
    label: string;
  };
  locked?: boolean;
  className?: string;
}
