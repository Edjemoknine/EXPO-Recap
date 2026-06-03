import { router } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Button title="Go to Login" onPress={() => router.push("/login")} />
      <Button title="Go to Register" onPress={() => router.push("/register")} />
    </SafeAreaView>
  );
};

export default index;
