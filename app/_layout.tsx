import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { CartButton } from "@/components/cart-button";
import { themeProps, useTheme } from "@/constants/theme";
import { CartProvider } from "@/contexts/cart";
import { ProdutcsProvider } from "@/contexts/products";

const queryClient = new QueryClient();

const Screens = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: themeProps[theme].background,
          padding: 15,
        },
        headerStyle: {
          backgroundColor: themeProps[theme].background,
        },
        headerTintColor: themeProps[theme].color,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerRight: () => <CartButton />,
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          title: "Shopping cart",
        }}
      />
      <Stack.Screen
        name="product/[productId]/view"
        options={{
          title: "Product detail",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProdutcsProvider>
        <CartProvider>
          <Screens />
        </CartProvider>
      </ProdutcsProvider>
    </QueryClientProvider>
  );
}
