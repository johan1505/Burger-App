import { CartItem } from "@/components/cart-item";
import { Price } from "@/components/price";
import { CartContext } from "@/contexts/cart";
import { ProductsContext } from "@/contexts/products";
import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Theme, themeProps, useTheme } from "../constants/theme";

export default function Cart() {
  const { cart, clearCart } = useContext(CartContext);
  const { products } = useContext(ProductsContext);

  const cartItems = Array.from(cart.entries());
  const cartTotal = cartItems.reduce(
    (sum, [productId, quantity]) =>
      sum + (products.get(productId)?.price ?? 0) * quantity,
    0
  );
  const theme = useTheme();

  const styles = getStyles(theme);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {cartItems.length === 0 ? (
        <Text style={styles.title}>Your cart is empty</Text>
      ) : (
        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Text style={styles.title}>
            Total: <Price price={cartTotal} fontSize={styles.title.fontSize} />
          </Text>
          <FlatList
            data={cartItems}
            renderItem={({ item: [productId, quantity] }) => {
              const product = products.get(productId);

              if (!product) return null;

              return <CartItem item={product} quantity={quantity} />;
            }}
          ></FlatList>

          <Pressable style={styles.checkout}>
            <Text style={styles.checkoutText}> Checkout</Text>
          </Pressable>
          <Pressable
            style={styles.clearCart}
            onPress={() => {
              clearCart();
            }}
          >
            <Text style={styles.clearCartText}>Clear cart</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    title: {
      color: themeProps[theme].color,
      fontSize: 30,
      borderColor: "#ec003f",
      borderBottomWidth: 2,
      padding: 10,
      textAlign: "center",
    },
    clearCart: {
      backgroundColor: "#ec003f",
    },
    clearCartText: {
      color: "#ffff",
      fontSize: 20,
      textAlign: "center",
      padding: 10,
    },
    checkout: {
      backgroundColor: themeProps[theme].button.background,
      marginBottom: 15,
    },
    checkoutText: {
      color: themeProps[theme].button.color,
      fontSize: 20,
      textAlign: "center",
      padding: 10,
    },
  });
}
