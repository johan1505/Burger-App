import { Theme, themeProps, useTheme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
      height: "100%",
      padding: 30,
      flex: 1,
    },
    wrapper: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    button: {
      backgroundColor: themeProps[theme].button.background,
      borderWidth: 2,
      borderStyle: "solid",
      paddingHorizontal: 25,
      height: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: themeProps[theme].button.color,
      fontSize: 30,
      textAlign: "center",
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
      <Pressable
        style={styles.button}
        onPress={() => setQuantity(Math.max(1, quantity - 1))}
      >
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value={String(quantity)}
        aria-label="quantity-to-add"
        onChangeText={(val) => setQuantity(Number(val))}
        keyboardType="numeric"
        inputMode="numeric"
      />
      <Pressable
        style={styles.button}
        onPress={() => setQuantity(Math.max(1, quantity + 1))}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};
