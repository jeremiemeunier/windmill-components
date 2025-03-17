export interface ModalProps {
  children: React.ReactNode;
}

export interface CloseProps {
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  refreshing?: boolean;
  refreshHandler?: () => void;
}

export interface TitleProps {
  children: React.ReactNode;
}

export interface ModalContainerProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "fullscreen" | "sl" | "sm" | "sf";
  template?: "menu" | undefined;
  direction?: "top" | "bottom";
}

export interface BodyProps {
  children: React.ReactNode;
}

export interface NavigationProps {
  children: React.ReactNode;
}

export interface NavigationItemProps {
  label: string;
  setModalPage: React.Dispatch<React.SetStateAction<string | number>>;
  isActive: boolean;
  id: string | number;
}
