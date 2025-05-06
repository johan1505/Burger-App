import { useColorScheme } from "react-native";

type ThemeableProperties = {
  color: string;
  background: string;
};

export type Theme = "light" | "dark";

type ThemeProps = ThemeableProperties & { button: ThemeableProperties };

export const themeProps: Record<Theme, ThemeProps> = {
  light: {
    color: "#11181C",
    background: "#fff",
    button: {
      background: "#11181C",
      color: "#fff",
    },
  },
  dark: {
    color: "#ECEDEE",
    background: "#151718",
    button: {
      background: "#ECEDEE",
      color: "#151718",
    },
  },
};

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme() ?? "light";

  return colorScheme;
};
