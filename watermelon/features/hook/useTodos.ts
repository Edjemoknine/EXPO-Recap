import { useEffect, useState } from "react";
import Todo from "../../models/todos";
import { database } from "../../app/_layout";

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

  return todos;
};
