export interface DrawerProps {
  drawerContainer?: React.ReactNode;
  children: React.ReactNode;
}

export interface ContextProps {
  children: React.ReactNode;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProviderProps {
  drawerContentRef: any;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerOpen: boolean;
}
