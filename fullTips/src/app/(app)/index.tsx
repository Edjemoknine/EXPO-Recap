import { Button, Text, View } from "react-native";

import { useAuth } from "@/providers/auth-provider";

export default function Home() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}
