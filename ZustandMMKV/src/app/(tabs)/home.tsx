import data from "@/constants/data.json";
import useCartStore from "@/store/useStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
  const { addToCart, removeFromCart } = useCartStore();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 16,
              padding: 16,
              backgroundColor: "#959292",
              borderRadius: 8,
            }}
          >
            <Text>{item.title}</Text>
            <View
              style={{
                alignItems: "center",
                marginVertical: 8,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderRadius: 8,
              }}
            >
              <Image
                source={{ uri: item.image }}
                contentFit="cover"
                style={styles.image}
              />
            </View>
            <Text>{item.description}</Text>
            <Text>${item.price.toFixed(2)}</Text>
            <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#4CAF50" }]}
                onPress={() => addToCart(item)}
              >
                <Ionicons name="add-outline" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#f44336" }]}
                onPress={() => removeFromCart(item.id)}
              >
                <Ionicons name="remove-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
  button: {
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
