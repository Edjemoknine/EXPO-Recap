import { appSchema, tableSchema } from "@nozbe/watermelondb";

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "todos",
      columns: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "is_completed",
          type: "boolean",
        },
        {
          name: "created_at",
          type: "number",
        },
      ],
    }),
  ],
});

export default schema;
