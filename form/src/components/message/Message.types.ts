export interface MessageContentTypes {
  type: "negative" | "positive" | "neutral" | "main" | "default";
  content: string;
  format?: "icon" | "icon-cta" | "cta";
  icon?: string;
}

export interface MessageProps {
  data: MessageContentTypes | null;
  className?: string;
}
