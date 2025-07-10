export interface RadioValues {
  id: string | undefined;
  label: string;
  disabled?: boolean;
}

export interface RadioProps {
  viewBox: boolean;
  gridSize: number;
  values: RadioValues[];
  content: string | number;
  setContent: React.Dispatch<React.SetStateAction<string | number>>;
  error: any;
  label?: string;
  size?: number;
  className?: string;
}
