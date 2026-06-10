import { TextInput } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Search tasks..."
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: 14,
      }}
    />
  );
}
