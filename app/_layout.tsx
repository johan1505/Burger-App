import { CartButton } from "@/components/cart-button";
import { themeProps, useTheme } from "@/constants/theme";
import { CartProvider } from "@/contexts/cart";
import { ProdutcsProvider } from "@/contexts/products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";

const queryClient = new QueryClient();

export default function RootLayout() {
  const theme = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ProdutcsProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: themeProps[theme].background,
              },
            }}
          >
            <Stack.Screen
              name="home"
              options={{
                headerRight: () => <CartButton />,
              }}
            />
            <Stack.Screen name="cart" />
          </Stack>
        </CartProvider>
      </ProdutcsProvider>
    </QueryClientProvider>
  );
}
