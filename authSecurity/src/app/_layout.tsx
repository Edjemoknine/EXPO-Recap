import { Stack } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null; // or your splash screen
  }

  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(private)" />
        </Stack.Protected>

        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
  );
}

export default function RootLayout() {
  const publishableKey=process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  return (
      <ClerkProvider
          publishableKey={publishableKey}
          tokenCache={tokenCache}
      >
        <RootNavigator />
      </ClerkProvider>
  );
}