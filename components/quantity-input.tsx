import { Theme, themeProps, useTheme } from "@/constants/theme";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedButton } from "./themed-button";

interface QuantityInputProps {
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  stretch?: boolean;
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      color: themeProps[theme].color,
      backgroundColor: themeProps[theme].background,
      borderColor: themeProps[theme].color,
      borderWidth: 2,
      borderStyle: "solid",
      flex: 2,
      paddingVertical: 20,
    },
    wrapper: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      justifyContent: "space-between",
    },
    quantityButton: {
      flex: 1,
    },
  });

export const QuantityInput = ({
  quantity,
  setQuantity,
}: QuantityInputProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.wrapper}>
      <View style={styles.quantityButton}>
        <ThemedButton
          style={styles.quantityButton}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
          text={"-"}
        />
      </View>
      <TextInput
        style={styles.input}
        value={String(quantity)}
        aria-label="quantity-to-add"
        onChangeText={(val) => {
          setQuantity(Number(val === "" ? 1 : val));
        }}
        keyboardType="numeric"
        inputMode="numeric"
      />
      <View style={styles.quantityButton}>
        <ThemedButton
          style={styles.quantityButton}
          onPress={() => setQuantity(Math.max(1, quantity + 1))}
          text="+"
        />
      </View>
    </View>
  );
};
