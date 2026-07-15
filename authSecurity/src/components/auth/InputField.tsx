import { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  placeholder: string;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  onChangeText?: (text: string) => void;
  icon?: React.ReactNode;
};

const InputField = ({
  placeholder,
  label,
  secureTextEntry = false,
  keyboardType = "default",
  value = "",
  onChangeText = () => {},
  icon,
}: Props) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View
        style={[styles.inputWrapper, focused && styles.inputWrapperFocused]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 8,
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F9F9F9",
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: "#4CAF50",
    backgroundColor: "#FFF",
    borderWidth: 2,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 10,
  },
  iconContainer: {
    marginRight: 8,
  },
});
