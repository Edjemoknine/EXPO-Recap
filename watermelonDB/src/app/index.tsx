import { router } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingButton } from "../components/FloatingButton";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { Stats } from "../components/Stats";
import { TodoList } from "../components/TodoList";
import { useTodos } from "../hook/useTodos";

export default function HomeScreen() {
  const { todos } = useTodos();

  const stats = useMemo(() => {
    const completed = todos.filter((t) => t.is_completed).length;
    return {
      total: todos.length,
      completed,
    };
  }, [todos]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8FAFC",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <Header />

        <View
          style={{
            height: 20,
          }}
        />

        <SearchBar value="" onChange={() => {}} />

        <View
          style={{
            height: 20,
          }}
        />

        <Stats total={stats.total} completed={stats.completed} />

        <View
          style={{
            height: 20,
          }}
        />

        <TodoList todos={todos} />

        <FloatingButton onPress={() => router.push("/create")} />
      </View>
    </SafeAreaView>
  );
}
