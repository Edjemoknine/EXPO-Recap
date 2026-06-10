import { database } from "@/app/_layout";
import { Todo } from "@/types/todo";
import { createTodo } from "@/utils/repository";
import { useEffect, useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const subscription = database
      .get("todos")
      .query()
      .observe()
      .subscribe(setTodos);

    return () => subscription.unsubscribe();
  }, []);

  const addTodo = async (todoData: {
    title: string;
    is_completed: boolean;
    created_at: number;
  }) => {
    await createTodo(todoData.title);
  };

  return { todos, addTodo };
};

export default useTodos;
