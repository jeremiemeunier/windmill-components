export type MessageColor =
  | "content"
  | "positive"
  | "negative"
  | "neutral"
  | "brand"
  | "punch"
  | "vivid-sky-blue"
  | "mexican-pink"
  | "chartreuse"
  | "malachite"
  | "tomato"
  | "process-cyan"
  | "atomic-tangerine"
  | "ash-gray"
  | "vanilla"
  | "yellow-green"
  | "violet"
  | "verdigri"
  | "jonquil";
export type MessageState = MessageContentTypes | null;

export interface MessageContentTypes {
  type: MessageColor;
  content: string;
  format?: "icon" | "icon-cta" | "cta";
  icon?: string;
}

export interface MessageProps {
  data: MessageState;
  className?: string;
}
