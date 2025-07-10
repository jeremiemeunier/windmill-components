export interface ModalProps {
  children: React.ReactNode;
}

export interface CloseProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  refreshHandler?: () => void;
}

export interface HeaderProps {
  children: React.ReactNode;
}

export interface ModalContainerProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "fullscreen" | "sl" | "sm" | "sf";
  template?: "menu" | undefined;
  direction?: "top" | "bottom";
  maxHeight?: string;
}

export interface BodyProps {
  children: React.ReactNode;
}

export interface NavigationProps {
  children: React.ReactNode;
}

export interface NavigationItemProps {
  label: string;
  setPage: React.Dispatch<React.SetStateAction<string | number>>;
  isActive: boolean;
  pageId: string | number;
}
