import { StyleSheet, Text } from "react-native";

import { Theme, themeProps, useTheme } from "../constants/theme";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontWeight: 900,
      color: themeProps[theme].color,
    },
  });

export const Price = ({
  price,
  fontSize = 18,
}: {
  price: number;
  fontSize?: number;
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <Text style={{ ...styles.text, fontSize }}>${price.toFixed(2)}</Text>;
};
