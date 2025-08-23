import React, { SetStateAction } from "react";

export interface ContextProps {
  children: React.ReactNode;
}

export interface ProviderProps {
  appActualPage: string;
  setAppActualPage: React.Dispatch<SetStateAction<string>>;
  appActualSubPage: string;
  setAppActualSubPage: React.Dispatch<SetStateAction<string>>;
  appActualCategory: string;
  setAppActualCategory: React.Dispatch<SetStateAction<string>>;
  appMenuVisibility: boolean;
  setAppMenuVisibility: React.Dispatch<SetStateAction<boolean>>;
}
