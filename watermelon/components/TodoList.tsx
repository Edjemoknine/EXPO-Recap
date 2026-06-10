import { FlatList } from "react-native";

import { TodoCard } from "./TodoCard";

export function TodoList({ todos }: any) {
  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TodoCard todo={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
