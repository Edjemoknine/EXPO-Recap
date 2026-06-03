import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  useColorScheme,
  View,
} from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useAuthStore } from "@/store/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, checkAuth, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerRight: () => (
                <Pressable onPress={() => logout()}>
                  <MaterialIcons name="logout" size={20} />
                </Pressable>
              ),
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
