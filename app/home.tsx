import { useContext } from "react";
import { FlatList, View } from "react-native";
import ProductCard from "../components/product-card";
import { themeProps, useTheme } from "../constants/theme";
import { ProductsContext } from "../contexts/products";

export default function ProductList() {
  const { products } = useContext(ProductsContext);
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        style={{
          width: "100%",
        }}
        data={Array.from(products.values())}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: themeProps[theme].color,
              margin: 10,
            }}
          />
        )}
      />
    </View>
  );
}
