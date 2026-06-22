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
      <Link href="/profile">Profile</Link>
      {/* <Button title="Remove Onboarding" onPress={logoutOnboarding} /> */}
    </View>
  );
}
