import { useRouter } from "expo-router";
import React from "react";
import { ThemedButton } from "./themed-button";

export const CartButton: React.FC = () => {
  const router = useRouter();

  return (
    <ThemedButton
      variant="secondary"
      onPress={() => router.push("/cart")}
      text="Cart"
    />
  );
};
