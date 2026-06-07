import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../../../store/useStore";

export default function CreateNote() {
  const router = useRouter();
  const createNote = useStore((s) => s.createNote);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onBack = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (trimmedTitle || trimmedContent) {
      await createNote(trimmedTitle, trimmedContent);
    }
    router.back();
  };

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
});
