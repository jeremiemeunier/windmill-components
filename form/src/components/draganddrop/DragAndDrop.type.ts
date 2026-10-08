import { InputLocker } from "../base/Base.types";

export interface DragAndDropProps {
  name: string;
  size?: number;
  label?: string;
  authorizedFiles: string[];
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  dataIsLoading?: boolean;
  lockWhenDataIsLoading?: boolean;
  locked?: InputLocker;
  onChange?: (file: File | File[] | null) => void;
}
