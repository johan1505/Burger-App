import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

export default function ProductList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://burgerhub00.github.io/data/products.json").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
