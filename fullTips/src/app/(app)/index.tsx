import { Button, Text, View } from "react-native";

import { useAuth } from "@/providers/auth-provider";
import { useOnboarding } from "@/providers/onboarding-provider";
import { Link } from "expo-router";

export default function Home() {
  const { logout } = useAuth();
  const { logoutOnboarding } = useOnboarding();
  const logoutAll = () => {
    logoutOnboarding();
    logout();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text>Home</Text>

      <Button title="Logout" onPress={logoutAll} />
      {/* <Link href="/profile">Profile</Link>
      <Link href="/gustures">Gustures</Link>
      <Link href="/cssTransitions">CSS Transitions</Link>
      <Link href="/cssAnimation">CSS Animation</Link> */}
      <Link href="/cities">Cities</Link>
      <Link href="/(app)/LayouTransition">Layout Transition</Link>
      <Link href="/(app)/customAnimation">Custom Animation</Link>
      {/* <Button title="Remove Onboarding" onPress={logoutOnboarding} /> */}
    </View>
  );
}
