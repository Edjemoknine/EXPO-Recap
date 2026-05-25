import { Stack, usePathname } from "expo-router";

export default function RootLayout() {
  const isAuthenticated = true;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
        }}
      /> */}
    </Stack>
  );
}
