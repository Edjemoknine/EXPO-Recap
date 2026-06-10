import { View, Text } from "react-native";

type Props = {
  total: number;
  completed: number;
};

export function Stats({ total, completed }: Props) {
  const pending = total - completed;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
      }}
    >
      <StatCard title="Total" value={total} />

      <StatCard title="Done" value={completed} />

      <StatCard title="Pending" value={pending} />
    </View>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
      }}
    >
      <Text>{title}</Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>
    </View>
  );
}
