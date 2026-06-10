import { SafeAreaView, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { Stats } from "../components/Stats";
import { TodoList } from "../components/TodoList";
import { FloatingButton } from "../components/FloatingButton";

const MOCK_TODOS = [
  {
    id: "1",
    title: "Learn WatermelonDB",
    completed: false,
  },
  {
    id: "2",
    title: "Build Todo App",
    completed: true,
  },
];

export function HomeScreen() {
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

        <Stats total={2} completed={1} />

        <View
          style={{
            height: 20,
          }}
        />

        <TodoList todos={MOCK_TODOS} />

        <FloatingButton onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}
