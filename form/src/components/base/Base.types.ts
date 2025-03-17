export interface BaseBlockProps {
  id: string;
  children: React.ReactNode;
  label?: string;
  size?: number;
  tagline?: React.ReactNode;
  required?: boolean;
  className?: string;
}

export interface InputBlockProps {
  children: React.ReactNode;
  error: string | boolean;
  maxLength?: number;
  className?: string;
}

export interface RadioCheckboxBlockProps {
  children: React.ReactNode;
  error: string;
  gridSize: number;
  className?: string;
}

export interface SelectBlockProps {
  children: React.ReactNode;
  error: string;
  className?: string;
}

export interface LoaderProps {
  size?: "small" | "medium" | "large";
}
