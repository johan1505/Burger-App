import { Price } from "@/components/price";
import { QuantityInput } from "@/components/quantity-input";
import { ThemedButton } from "@/components/themed-button";
import { Theme, themeProps, useTheme } from "@/constants/theme";
import { CartContext } from "@/contexts/cart";
import { ProductsContext } from "@/contexts/products";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams<{ productId: string }>();

  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);

  const product = products.get(productId);

  if (!product) return <Text>Product not found</Text>;
  const theme = useTheme();
  const styles = getStyles(theme);

  const [quantity, setQuantity] = React.useState(1);

  return (
    <View
      style={{
        flex: 1,
        gap: 20,
      }}
    >
      <Text style={styles.title}>{product.name}</Text>
      <Image
        alt={product?.name}
        source={{
          uri: product?.image,
        }}
        style={styles.image}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Price price={product.price} />
        <Text style={styles.subTitle}>{product.calorie} cal</Text>
      </View>
      <Text style={styles.subTitle}>{product.description}</Text>
      <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      <ThemedButton
        variant="secondary"
        onPress={() => {
          addToCart(product.id, quantity);
          router.back();
        }}
        text={
          <>
            Add to cart <Price price={Number(product?.price) * quantity} />
          </>
        }
      />
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      padding: 15,
      gap: 30,
      alignItems: "center",
    },
    title: {
      fontWeight: 900,
      fontSize: 30,
      color: themeProps[theme].color,
      borderBottomColor: "#ec003f",
      borderBottomWidth: 1,
      width: "100%",
      paddingBottom: 10,
      textAlign: "center",
    },
    subTitle: {
      color: themeProps[theme].color,
      fontSize: 15,
    },
    image: {
      width: "100%",
      height: 300,
      borderWidth: 1,
      borderColor: themeProps[theme].color,
    },
  });
}
