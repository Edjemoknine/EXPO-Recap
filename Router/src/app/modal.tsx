import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const modal = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>modal</Text>
      <Button title="Close" onPress={() => router.back()} />
    </SafeAreaView>
  );
};

export default modal;
