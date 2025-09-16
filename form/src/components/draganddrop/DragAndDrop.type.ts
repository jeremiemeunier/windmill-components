import { InputContent } from "../input";

export interface DragAndDropContent extends InputContent {
  value: File[];
}

export interface DragAndDropProps {
  size?: number;
  label?: string;
  content: DragAndDropContent;
  setContent: React.Dispatch<React.SetStateAction<DragAndDropContent>>;
  authorizedFiles: string[];
  multipleUpload?: boolean;
  className?: string;
  dataIsLoading?: boolean;
}
