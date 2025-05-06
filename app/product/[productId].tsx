import { Price } from "@/components/price";
import { QuantityInput } from "@/components/quantity-input";
import { Theme, themeProps, useTheme } from "@/constants/theme";
import { ProductsContext } from "@/contexts/procuts";
import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const getStyles = (theme: Theme) =>
  StyleSheet.create({
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
  });

export default function ProductDetails() {
  const { productId } = useLocalSearchParams<{ productId: string }>();

  const { products } = useContext(ProductsContext);

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
        gap: 30,
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
      {/* 
   
      <QuantityInput
        quantity={quantity}
        setQuantity={setQuantity}
        ref={quantityInputRef}
        stretch
      />
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 cursor-pointer"
      >
        Add to Cart <Price price={Number(food?.price) * quantity} />
      </button> */}
    </View>
  );
}
