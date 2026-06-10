export type TodoType = "basic";

export type Todo = {
  id: string;
  title: string;
  is_completed: boolean;
  created_at: number;
};

export type TodoList = Todo[];
