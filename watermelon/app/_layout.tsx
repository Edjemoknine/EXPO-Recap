import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Database } from "@nozbe/watermelondb";
import schema from "../utils/schema";
import migrations from "../utils/migration";
import Todo from "../models/todos";
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
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="todos" options={{ title: "My Todos" }} /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
