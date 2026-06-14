import { Button, Text, View } from "react-native";

import { useAuth } from "@/providers/auth-provider";
import { useOnboarding } from "@/providers/onboarding-provider";

export default function Home() {
  const { logout } = useAuth();
  const { logoutOnboarding } = useOnboarding();
  const logoutAll = () => {
    logoutOnboarding();
    logout();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>

      <Button title="Logout" onPress={logoutAll} />
      {/* <Button title="Remove Onboarding" onPress={logoutOnboarding} /> */}
    </View>
  );
}
