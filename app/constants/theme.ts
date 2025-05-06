import { useColorScheme } from "react-native";

type ThemeableProperties = {
  color: string;
  background: string;
};

export type Theme = "light" | "dark";

export const themeProps: Record<Theme, ThemeableProperties> = {
  light: {
    color: "#11181C",
    background: "#fff",
  },
  dark: {
    color: "#ECEDEE",
    background: "#151718",
  },
};

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme() ?? "light";

  return colorScheme;
};
