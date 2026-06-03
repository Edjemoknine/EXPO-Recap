import { useAuthStore } from "@/store/useAuth";
import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthStore();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        gap: 20,
        justifyContent: "center",
      }}
    >
      <Text>login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={() => login(username, password)} />
    </SafeAreaView>
  );
};

export default login;
