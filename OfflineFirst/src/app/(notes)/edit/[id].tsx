import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../../../../store/useStore";

export default function EditNote() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const note = useStore((s) => s.notes.find((note) => note.id === id));
  const updateNote = useStore((s) => s.updateNote);
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const onBack = async () => {
    if (!note) {
      router.back();
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle !== note.title || trimmedContent !== note.content) {
      await updateNote(note.id, {
        title: trimmedTitle,
        content: trimmedContent,
        modifiedDate: new Date(),
      });
    }

    router.back();
  };

  if (!note) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Note not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
        />
        <TextInput
          placeholder="Write your note..."
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          multiline
          textAlignVertical="top"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    // paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  backButton: {
    // paddingVertical: 8,
    // paddingHorizontal: 8,
  },
  backText: { fontSize: 60, color: "#007AFF" },
  form: { padding: 16, flex: 1 },
  titleInput: {
    height: 44,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    marginBottom: 12,
    fontSize: 16,
  },
  contentInput: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#666", fontSize: 16 },
});
