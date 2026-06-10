import { database } from "../app/_layout";

export const createTodo = async (title: string) => {
  await database.write(async () => {
    await database.get("todos").create((todo) => {
      todo.title = title;
      todo.isCompleted = false;
      todo.createdAt = Date.now();
    });
  });
};

export const toggleTodo = async (todo) => {
  await database.write(async () => {
    await todo.update((record) => {
      record.isCompleted = !record.isCompleted;
    });
  });
};

export const deleteTodo = async (todo) => {
  await database.write(async () => {
    await todo.markAsDeleted();
  });
};
