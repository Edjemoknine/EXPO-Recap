import TodoForm from "@/components/TodoForm";
import { useTodos } from "@/hook/useTodos";
import { colors } from "@/themes/colors";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const { addTodo } = useTodos();

  const handleSubmit = async (data: { title: string }) => {
    try {
      setIsLoading(true);
      await addTodo({
        title: data.title,
        is_completed: false,
        created_at: Date.now(),
      });
      router.back();
    } catch (error) {
      console.error("Error creating todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TodoForm onSubmit={handleSubmit} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
