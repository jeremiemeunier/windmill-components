import { InputContent } from "../input";

export interface DragAndDropContent extends InputContent {
  value: FileList | null;
}

export interface DragAndDropProps {
  size?: number;
  label?: string;
  content: DragAndDropContent;
  setContent: React.Dispatch<React.SetStateAction<DragAndDropContent>>;
  authorizedFiles: string[];
  className?: string;
  dataIsLoading?: boolean;
}
