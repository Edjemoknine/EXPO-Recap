import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { Text, useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import useCartStore from "@/store/useStore";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const cartItems = useCartStore((state) => state.cartItems);
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{ headerRight: () => <Text>{cartItems.length}</Text> }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
