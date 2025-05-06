import { Price } from "@/components/price";
import { QuantityInput } from "@/components/quantity-input";
import { Theme, themeProps, useTheme } from "@/constants/theme";
import { CartContext } from "@/contexts/cart";
import { ProductsContext } from "@/contexts/products";
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

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
        alignItems: "center",
        gap: 25,
        padding: 30,
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
      <Pressable
        style={styles.addToCartButton}
        onPress={() => {
          addToCart(product.id, quantity);
          router.push("/home");
        }}
      >
        <Text style={styles.addToCartButtonText}>
          Add to cart <Price price={Number(product?.price) * quantity} />
        </Text>
      </Pressable>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: themeProps[theme].background,
      padding: 15,
      gap: 30,
      alignItems: "center",
      borderWidth: 1,
      borderBottomColor: themeProps[theme].color,
      borderTopColor: themeProps[theme].color,
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
    addToCartButton: {
      backgroundColor: "#ec003f",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    addToCartButtonText: {
      color: "#ffff",
      fontSize: 20,
      width: "100%",
      textAlign: "center",
      padding: 20,
    },
  });
}
