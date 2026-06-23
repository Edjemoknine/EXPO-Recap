import { cities } from "@/utils/data";
import { Link } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";

export default function CitiesScreen() {
  return (
    <FlatList
      data={cities}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        padding: 5,
        flexGrow: 1,
        width: "100%",
        flex: 1,
        gap: 5,
      }}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/(app)/city/[id]",
            params: { id: item.id },
          }}
          asChild
        >
          <Pressable style={{ width: "50%", padding: 5 }}>
            <Animated.Image
              sharedTransitionTag={`city-image-${item.id}`}
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 220,
                borderRadius: 16,
              }}
            />

            <View style={{ paddingVertical: 12 }}>
              <Text style={{ fontSize: 22, fontWeight: "700" }}>
                {item.name}
              </Text>
              <Text>{item.country}</Text>
            </View>
          </Pressable>
        </Link>
      )}
    />
  );
}
