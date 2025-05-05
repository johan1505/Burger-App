import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        height: 1000,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      hii
      <Button
        title="text"
        onPress={() => router.navigate("/product-details")}
      ></Button>
    </View>
  );
}
