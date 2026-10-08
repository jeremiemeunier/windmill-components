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
  size?: "s-lg" | "s-sm" | "s-xl" | "s-fs" | "s-md";
  template?: "menu" | undefined;
  direction?: "top" | "bottom";
  maxHeight?: string;
}

export interface ModalSmallActionsProps {
  children?: React.ReactNode;
}

export interface ModalActionsProps {
  children: React.ReactNode;
  isLink?: boolean;
  to?: string;
  title?: string;
  handler?: () => void;
}

export interface BodyProps {
  children: React.ReactNode;
  id?: string;
  tabPanel?: boolean;
}

export interface NavigationProps {
  children: React.ReactNode;
}

export interface NavigationItemProps {
  label: string;
  setPage: React.Dispatch<React.SetStateAction<string | number>>;
  isActive: boolean;
  pageId: string | number;
  panelId?: string;
}
