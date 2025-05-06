import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Theme, themeProps, useTheme } from "../constants/theme";
import { Product } from "../contexts/products";

interface ProductCardProps extends Product {}

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
      fontSize: 18,
      color: themeProps[theme].color,
    },
    subTitle: {
      color: themeProps[theme].color,
    },
    innerContainer: {
      gap: 5,
    },
    image: {
      width: 150,
      height: 150,
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
        <Image
          alt={name}
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{calorie} cal</Text>
          <Text style={styles.subTitle}>{price}</Text>
        </View>
      </View>
    </Pressable>
  );
}
