import { ThemeName } from "../../components/themeselector/ThemeSelector.types";

export interface ThemeProvider {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  colorTheme: ThemeName;
  setColorTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
}

export interface ThemeContext {
  children: React.ReactNode;
  availableTheme: ThemeName[];
}
