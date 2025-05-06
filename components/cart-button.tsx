import { themeProps, useTheme } from "@/constants/theme";
import { CartContext } from "@/contexts/cart";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const CartButton: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const { cart } = useContext(CartContext);

  return (
    <View
      style={{
        position: "relative",
        width: 50,
        height: 50,
      }}
    >
      <Icon
        onPress={() => router.push("/cart")}
        name="shopping-cart"
        style={{
          fontSize: 30,
          padding: 8,
          color: themeProps[theme].color,
          backgroundColor: "red",
        }}
      />
      {cart.size > 0 ? (
        <Text
          style={{
            color: themeProps[theme].color,
            position: "absolute",
            right: 2,
          }}
        >
          {cart.size}
        </Text>
      ) : null}
    </View>
  );
};
