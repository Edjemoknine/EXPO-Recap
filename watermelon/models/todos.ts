import { Model } from "@nozbe/watermelondb";

export default class Todo extends Model {
  static table = "todos";

  // Use accessors instead of decorators to avoid decorator resolution issues
  get title(): string {
    // @ts-expect-error _raw is provided by WatermelonDB
    return this._raw.title;
  }

  get isCompleted(): boolean {
    // @ts-expect-error _raw is provided by WatermelonDB
    return this._raw.is_completed;
  }

  get createdAt(): number {
    // @ts-expect-error _raw is provided by WatermelonDB
    return this._raw.created_at;
  }
}

export type TodoType = {
  title: string;
  isCompleted: boolean;
  createdAt: number;
};
