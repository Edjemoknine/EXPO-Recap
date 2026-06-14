import { Stack } from "expo-router";

import { AuthProvider } from "@/providers/auth-provider";
import { OnboardingProvider } from "@/providers/onboarding-provider";

import { useAuth } from "@/providers/auth-provider";
import { useOnboarding } from "@/providers/onboarding-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RootNavigator() {
  const { userToken } = useAuth();
  const { hasOnboarded } = useOnboarding();
  console.log({ userToken, hasOnboarded });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Onboarding */}

      <Stack.Protected guard={!hasOnboarded}>
        <Stack.Screen name="customOnboarding" />
      </Stack.Protected>

      {/* Guest */}

      <Stack.Protected guard={hasOnboarded && !userToken}>
        <Stack.Screen name="login" />
      </Stack.Protected>

      {/* App */}

      <Stack.Protected guard={hasOnboarded && !!userToken}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <OnboardingProvider>
          <RootNavigator />
        </OnboardingProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
