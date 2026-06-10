import { database } from "../app/_layout";

export const createTodo = async (title: string) => {
  await database.write(async () => {
    await database.get("todos").create((todo) => {
      todo.title = title;
      todo.is_completed = false;
      todo.created_at = Date.now();
    });
  });
};

export const toggleTodo = async (todo: any) => {
  await database.write(async () => {
    await todo.update((record) => {
      record.isCompleted = !record.isCompleted;
    });
  });
};

export const deleteTodo = async (todo: any) => {
  await database.write(async () => {
    await todo.markAsDeleted();
  });
};
