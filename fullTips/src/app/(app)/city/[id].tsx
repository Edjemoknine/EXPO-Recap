import { cities } from "@/utils/data";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function CityDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const city = cities.find((item) => item.id === id);

  if (!city) {
    return (
      <View style={styles.center}>
        <Text>City not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: city.name,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />

      <View style={{ flex: 1 }}>
        <Animated.Image
          sharedTransitionTag={`city-image-${city.id}`}
          source={{ uri: city.image }}
          style={styles.hero}
        />

        <Animated.View entering={FadeInDown.delay(200)} style={styles.content}>
          <Text style={styles.title}>{city.name}</Text>

          <Text style={styles.country}>{city.country}</Text>

          <Text style={styles.description}>
            {city.name} is a remarkable destination known for its culture,
            architecture, local cuisine, and unique attractions. Visitors can
            explore historic neighborhoods, enjoy regional specialties, and
            experience a blend of tradition and modern life.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Best time to visit</Text>
            <Text style={styles.value}>Spring & Autumn</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Popular activities</Text>
            <Text style={styles.value}>
              • Sightseeing{"\n"}• Museums{"\n"}• Food tours{"\n"}• Photography
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Travel tip</Text>
            <Text style={styles.value}>
              Use public transportation and explore local neighborhoods beyond
              the main tourist areas for a more authentic experience.
            </Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    height: 350,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 6,
  },
  country: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  },
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#f3f3f3",
    marginBottom: 16,
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    fontSize: 15,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
