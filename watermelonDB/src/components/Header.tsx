import { View, Text } from "react-native";

export function Header() {
  return (
    <View>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        My Tasks
      </Text>

      <Text
        style={{
          marginTop: 4,
          color: "#64748B",
        }}
      >
        Stay productive today
      </Text>
    </View>
  );
}
