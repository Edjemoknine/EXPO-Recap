import { colors } from "@/themes/colors";
import { TodoType } from "@/types/todo";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TodoFormProps {
  onSubmit: (data: { title: string }) => void;
  isLoading?: boolean;
}

const TODO_TYPES: { label: string; value: TodoType }[] = [
  { label: "Basic", value: "basic" },
];

export default function TodoForm({
  onSubmit,
  isLoading = false,
}: TodoFormProps) {
  const [selectedType, setSelectedType] = useState<TodoType>("basic");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    onSubmit({
      title: title.trim(),
    });

    setTitle("");
    setSelectedType("basic");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Type Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>Todo Type</Text>
        <View style={styles.typeContainer}>
          {TODO_TYPES.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.typeButton,
                selectedType === type.value && styles.typeButtonActive,
              ]}
              onPress={() => setSelectedType(type.value)}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  selectedType === type.value && styles.typeButtonTextActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Basic Form Fields */}
      {selectedType === "basic" && (
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter todo title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={colors.background}
            editable={!isLoading}
          />
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? "Creating..." : "Create Todo"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  typeButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  typeButtonTextActive: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.background,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
