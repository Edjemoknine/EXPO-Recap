import { Stack } from "expo-router";

import { AuthProvider } from "@/providers/auth-provider";
import { OnboardingProvider } from "@/providers/onboarding-provider";

import { useAuth } from "@/providers/auth-provider";
import { useOnboarding } from "@/providers/onboarding-provider";

function RootNavigator() {
  const { userToken } = useAuth();
  const { hasOnboarded } = useOnboarding();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Onboarding */}

      <Stack.Protected guard={!hasOnboarded}>
        <Stack.Screen name="onboarding" />
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
    <AuthProvider>
      <OnboardingProvider>
        <RootNavigator />
      </OnboardingProvider>
    </AuthProvider>
  );
}
