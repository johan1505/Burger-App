import { Price } from "@/components/price";
import { QuantityInput } from "@/components/quantity-input";
import { CartContext } from "@/contexts/cart";
import { Product } from "@/contexts/products";
import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Theme, themeProps, useTheme } from "../constants/theme";

type CartItemProps = {
  item: Product;
  quantity: number;
};

export function CartItem({ item, quantity }: CartItemProps) {
  const theme = useTheme();
  const { updateCartQuantity } = useContext(CartContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          alt={item.name}
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />
      </View>

      <View style={{ flex: 2, gap: 10 }}>
        <Text style={styles.itmeName}>{item.name}</Text>

        <Text style={styles.price}>
          Price: <Price price={item.price}></Price>
        </Text>
        <Text style={styles.subTotal}>
          Subtotal: <Price price={item.price * quantity}></Price>
        </Text>

        <QuantityInput
          quantity={quantity}
          setQuantity={(newQuantity) =>
            updateCartQuantity(item.id, newQuantity)
          }
        />
        <Pressable
          style={styles.remoteButton}
          onPress={() => {
            updateCartQuantity(item.id, 0);
          }}
        >
          <Text style={styles.remoteButtonText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderBottomColor: themeProps[theme].color,
      paddingVertical: 20,
      gap: 15,
    },
    itmeName: {
      fontWeight: 900,
      fontSize: 20,
      color: themeProps[theme].color,
    },
    price: {
      fontWeight: 500,
      fontSize: 15,
      color: themeProps[theme].color,
    },
    subTotal: {
      fontWeight: 500,
      fontSize: 15,
      color: themeProps[theme].color,
    },
    image: {
      width: "100%",
      height: 150,
      borderWidth: 1,
      borderColor: themeProps[theme].color,
    },
    remoteButton: {
      backgroundColor: "#ec003f",
    },
    remoteButtonText: {
      color: "#ffff",
      fontSize: 20,
      width: "100%",
      textAlign: "center",
      padding: 10,
    },
  });
}
