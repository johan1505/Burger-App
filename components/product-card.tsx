import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Theme, themeProps, useTheme } from "../constants/theme";
import { Product } from "../contexts/products";
import { Price } from "./price";

interface ProductCardProps extends Product {}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: themeProps[theme].background,
      gap: 20,
      alignItems: "center",
    },
    title: {
      fontWeight: 900,
      fontSize: 20,
      color: themeProps[theme].color,
    },
    subTitle: {
      color: themeProps[theme].color,
    },
    image: {
      width: "100%",
      height: 100,
      borderWidth: 1,
      borderColor: themeProps[theme].color,
    },
  });

export default function ProductCard({
  name,
  price,
  image,
  calorie,
  id,
}: ProductCardProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Pressable onPress={() => router.push(`/product/${id}`, {})}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Image
            alt={name}
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        </View>

        <View style={{ flex: 2 }}>
          <Text style={styles.title}>{name}</Text>
          <Price price={price}></Price>
          <Text style={styles.subTitle}>{calorie} cal</Text>
        </View>
      </View>
    </Pressable>
  );
}
