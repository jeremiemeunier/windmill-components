import React, { createContext, useState } from "react";
import { ContextProps, ProviderProps } from "./NavigationContext.types";

export const NavigationContext = createContext<ProviderProps>({
  appActualPage: "",
  setAppActualPage: () => {},
  appActualSubPage: "",
  setAppActualSubPage: () => {},
  appActualCategory: "",
  setAppActualCategory: () => {},
  appMenuVisibility: false,
  setAppMenuVisibility: () => {},
});

const NavigationProvider: React.FC<ContextProps> = ({ children }) => {
  const [appActualPage, setAppActualPage] = useState<string>("");
  const [appActualSubPage, setAppActualSubPage] = useState<string>("");
  const [appActualCategory, setAppActualCategory] = useState<string>("");
  const [appMenuVisibility, setAppMenuVisibility] = useState<boolean>(false);

  return (
    <NavigationContext.Provider
      value={{
        appActualPage,
        setAppActualPage,
        appActualSubPage,
        setAppActualSubPage,
        appActualCategory,
        setAppActualCategory,
        appMenuVisibility,
        setAppMenuVisibility,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
