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
      }}
    >
      <Icon
        onPress={() => router.push("/cart")}
        name="shopping-cart"
        style={{
          fontSize: 25,
          color: themeProps[theme].color,
          backgroundColor: "red",
          padding: 10,
          width: 50,
        }}
      />
      {cart.size > 0 ? (
        <Text
          style={{
            color: themeProps[theme].color,
            position: "absolute",
            right: 4,
            top: 2,
          }}
        >
          {cart.size}
        </Text>
      ) : null}
    </View>
  );
};
