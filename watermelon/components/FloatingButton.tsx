import { Pressable } from "react-native";
import { Plus } from "lucide-react-native";

type Props = {
  onPress: () => void;
};

export function FloatingButton({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        position: "absolute",
        right: 20,
        bottom: 30,

        width: 64,
        height: 64,

        borderRadius: 32,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#2563EB",
      }}
    >
      <Plus size={30} color="#fff" />
    </Pressable>
  );
}
