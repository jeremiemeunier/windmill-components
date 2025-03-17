export interface ContextProps {
  children: React.ReactNode;
}

export interface ToastObject {
  content: string;
  type: "positive" | "negative" | "neutral" | null;
  id?: number;
  timer?: number;
  duration?: number;
  persistent?: boolean;
  title?: string;
  format?: {
    icon?: "left" | "right" | "both";
  };
  position?: "tl" | "tr" | "bl" | "br" | "cl" | "cr";
  icon?: string | string[];
  loading?: boolean;
  timed?: number;
}
