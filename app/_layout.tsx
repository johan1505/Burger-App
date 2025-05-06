import { themeProps, useTheme } from "@/constants/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { ProdutcsProvider } from "../contexts/procuts";

const queryClient = new QueryClient();

export default function RootLayout() {
  const theme = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ProdutcsProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: themeProps[theme].background,
            },
          }}
        >
          <Stack.Screen name="home" />
          <Stack.Screen name="cart" />
        </Stack>
      </ProdutcsProvider>
    </QueryClientProvider>
  );
}
