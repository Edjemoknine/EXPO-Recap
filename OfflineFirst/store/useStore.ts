import {
  openDatabaseAsync,
  SQLiteBindValue,
  type SQLiteDatabase,
} from "expo-sqlite";
import { create } from "zustand";

export interface Note {
  id: string;
  title: string | null;
  content: string | null;
  modifiedDate: Date | null;
}

export const DB_NAME = "notes.db"; // Turso db name

export const tursoOptions = {
  url: process.env.EXPO_PUBLIC_TURSO_DB_URL ?? "",
  authToken: process.env.EXPO_PUBLIC_TURSO_DB_AUTH_TOKEN ?? "",
};

let dbPromise: Promise<SQLiteDatabase> | null = null;
let syncInterval: number | undefined;

const getDb = async () => {
  if (!dbPromise) {
    dbPromise = openDatabaseAsync(DB_NAME);
  }
  return dbPromise;
};

const initDb = async () => {
  const db = await getDb();
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, modifiedDate TEXT)",
  );
};

const getAllAsync = async <T = any>(
  sql: string,
  ...args: SQLiteBindValue[]
) => {
  const db = await getDb();
  return db.getAllAsync<T>(sql, ...args);
};

const getFirstAsync = async <T = any>(
  sql: string,
  ...args: SQLiteBindValue[]
) => {
  const db = await getDb();
  return db.getFirstAsync<T>(sql, ...args);
};

type State = {
  notes: Note[];
  isSyncing: boolean;
  createNote: (title?: string, content?: string) => Promise<Note | undefined>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  syncNotes: () => Promise<void>;
  toggleSync: (enabled: boolean) => Promise<void>;
  fetchNotes: () => Promise<void>;
};

const useStore = create<State>((set, get) => ({
  notes: [],
  isSyncing: false,

  fetchNotes: async () => {
    await initDb();
    const notes = await getAllAsync(
      "SELECT * FROM notes ORDER BY modifiedDate DESC",
    );
    set({ notes });
  },

  syncNotes: async () => {
    console.log("Syncing notes with Turso DB...");

    try {
      if (!tursoOptions.url || !tursoOptions.authToken) {
        console.log("Turso options are not configured. Skipping remote sync.");
      }
      await get().fetchNotes();
      console.log("Sync complete.");
    } catch (error) {
      console.log(error);
    }
  },

  toggleSync: async (enabled: boolean) => {
    set({ isSyncing: enabled });

    if (enabled) {
      console.log("Starting sync interval...");
      await get().syncNotes();
      syncInterval = setInterval(() => {
        get().syncNotes();
      }, 2000) as unknown as number;
    } else if (syncInterval) {
      console.log("Stopping sync interval...");
      clearInterval(syncInterval);
      syncInterval = undefined;
    }
  },

  createNote: async (title?: string, content?: string) => {
    await initDb();
    const newNote: Omit<Note, "id"> = {
      title: title ?? "",
      content: content ?? "",
      modifiedDate: new Date(),
    };

    const db = await getDb();
    const result = await db.runAsync(
      "INSERT INTO notes (title, content, modifiedDate) VALUES (?, ?, ?)",
      [
        newNote.title,
        newNote.content,
        newNote.modifiedDate?.toISOString() ?? "",
      ],
    );

    const id = result.lastInsertRowId?.toString() ?? Date.now().toString();
    await get().fetchNotes();

    return { ...newNote, id };
  },

  updateNote: async (id, updates) => {
    await initDb();
    const numericId = parseInt(id, 10);
    const existingNote = await getFirstAsync(
      "SELECT * FROM notes WHERE id = ?",
      numericId,
    );
    if (!existingNote) return;

    const updatedNote = {
      title: updates.title ?? existingNote.title,
      content: updates.content ?? existingNote.content,
      modifiedDate: updates.modifiedDate ?? new Date(),
    };

    const db = await getDb();
    await db.runAsync(
      "UPDATE notes SET title = ?, content = ?, modifiedDate = ? WHERE id = ?",
      updatedNote.title,
      updatedNote.content,
      updatedNote.modifiedDate?.toISOString() ?? "",
      parseInt(id, 10),
    );

    await get().fetchNotes();
  },

  deleteNote: async (id) => {
    await initDb();
    const db = await getDb();
    const numericId = parseInt(id, 10);
    await db.runAsync("DELETE FROM notes WHERE id = ?", numericId);
    await get().fetchNotes();
  },
}));

export default useStore;
