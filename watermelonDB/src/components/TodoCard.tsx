import { Pressable, Text, View } from "react-native";
import { Todo } from "../../types/todo";

type Props = {
  todo: Todo;
};

export function TodoCard({ todo }: Props) {
  return (
    <Pressable>
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 16,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            marginRight: 12,
          }}
        />

        <Text
          style={{
            flex: 1,
          }}
        >
          {todo.title}
        </Text>
      </View>
    </Pressable>
  );
}
