import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";
export default class Todo extends Model {
  static table = "todos";

  @text("title") title!: string;
  @field("is_completed") is_completed!: boolean;
  @field("created_at") created_at!: number;
}
