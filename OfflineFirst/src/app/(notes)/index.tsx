import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../../../store/useStore";

export default function Index() {
  const router = useRouter();
  const notes = useStore((s) => s.notes);
  const fetchNotes = useStore((s) => s.fetchNotes);
  const syncNotes = useStore((s) => s.syncNotes);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <Pressable
          onPress={syncNotes}
          accessibilityLabel="Sync"
          style={styles.syncButton}
        >
          <Text style={styles.syncText}>Sync</Text>
        </Pressable>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/create")}
          accessibilityLabel="Create new note"
        >
          <Text style={styles.addButtonText}>＋</Text>
        </Pressable>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({ pathname: "/edit/[id]", params: { id: item.id } })
            }
          >
            <Text style={styles.cardTitle}>{item.title || "Untitled"}</Text>
            <Text numberOfLines={2} style={styles.cardContent}>
              {item.content}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No notes yet. Tap + to add one.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", position: "relative" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  title: { fontSize: 20, fontWeight: "600" },
  syncButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  syncText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "600",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 30,
    top: Dimensions.get("window").height - 200,
    zIndex: 10,
  },
  addButtonText: { color: "#fff", fontSize: 24, lineHeight: 24 },
  list: { padding: 16 },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  cardContent: { color: "#333" },
  empty: { padding: 24, alignItems: "center" },
  emptyText: { color: "#666" },
});
