import { Stack, router } from "expo-router";
import { Button } from "react-native";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <Button title="Generate" onPress={() => router.push("/generate")} />
          ),
        }}
      />
      <Stack.Screen name="generate" />
    </Stack>
  );
};

export default HomeLayout;
