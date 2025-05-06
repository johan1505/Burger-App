import { useContext } from "react";
import { FlatList, View } from "react-native";
import ProductCard from "../components/product-card";
import { ProductsContext } from "../contexts/products";

export default function ProductList() {
  const { products } = useContext(ProductsContext);
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
      />
    </View>
  );
}
