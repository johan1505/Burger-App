import { StyleSheet, Text } from "react-native";

import { Theme, themeProps, useTheme } from "../constants/theme";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontWeight: 900,
      color: themeProps[theme].color,
      fontSize: 20,
    },
  });

export const Price = ({ price }: { price: number }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <Text style={styles.text}>${price}</Text>;
};
