export interface EditorInterface {
  content: EditorBlockCardInterface[];
  title: string;
  enc_title: string;
  resume: string;
  author: string;
  color?: string;
}

export interface EditorBlockInterface {
  class?: string[];
  elements: EditorBlockElementInterface[];
}

export interface EditorBlockElementInterface {
  type: string;
  content: string | EditorBlockCardInterface[];
  class?: string[];
  author?: string;
}

export interface EditorBlockCardInterface {
  media: string;
  content: EditorBlockElementInterface[];
}
