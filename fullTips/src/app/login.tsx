import { Button, View } from "react-native";

import { useAuth } from "@/providers/auth-provider";

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Login" onPress={() => login("fake-token")} />
    </View>
  );
}
