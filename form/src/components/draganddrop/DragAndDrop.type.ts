export interface DragAndDropProps {
  size?: number;
  label?: string;
  content: File[];
  error: any;
  setContent: React.Dispatch<React.SetStateAction<File[]>>;
  authorizedFiles: string[];
  multipleUpload?: boolean;
  className?: string;
}
