import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

export const CartButton: React.FC = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/cart")} style={{ marginRight: 16 }}>
      <Text style={{ fontSize: 18 }}>🛒</Text>
    </Pressable>
  );
};
