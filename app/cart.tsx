import { CartItem } from "@/components/cart-item";
import { Price } from "@/components/price";
import { ThemedButton } from "@/components/themed-button";
import { Theme, themeProps, useTheme } from "@/constants/theme";
import { CartContext } from "@/contexts/cart";
import { ProductsContext } from "@/contexts/products";
import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

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
        padding: 10,
      }}
    >
      {cartItems.length === 0 ? (
        <Text style={styles.title}>Your cart is empty</Text>
      ) : (
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            gap: 10,
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
            keyExtractor={([productId]) => productId}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: themeProps[theme].color,
                }}
              />
            )}
          />

          <ThemedButton text="Checkout" />
          <ThemedButton
            variant="secondary"
            onPress={() => {
              clearCart();
            }}
            text="Clear cart"
          />
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
  });
}
