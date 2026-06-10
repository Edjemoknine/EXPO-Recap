import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Stack } from "expo-router";
import migrations from "../utils/migration";
import schema from "../utils/schema";
import Todo from "../utils/todos";
// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true /* Platform.OS === 'ios' */,
  onSetUpError: (error) => {
    console.error("Error setting up the database:", error);
  },
});

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [
    Todo, // ⬅️ You'll add Models to Watermelon here
  ],
});
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="create"
        options={{ presentation: "formSheet", sheetAllowedDetents: [0.5, 1] }}
      />
    </Stack>
  );
}
