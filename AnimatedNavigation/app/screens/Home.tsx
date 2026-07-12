import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";

import Animated from "react-native-reanimated";
import { SharedTransition } from "react-native-reanimated";

export default function HomeScreen() {
  const navigation = useNavigation();

  const transition = SharedTransition.duration(550).springify();
  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: "https://picsum.photos/id/39/200" }}
        style={{ width: 300, height: 300 }}
        resizeMode={"cover"}
        sharedTransitionTag="tag"
        sharedTransitionStyle={transition}
      />
      <Button onPress={() => navigation.navigate("Details")}>
        Go to Details
      </Button>
      <Animated.View
        style={{ width: 300, height: 300, backgroundColor: "red" }}
        sharedTransitionTag="ViewAni"
        sharedTransitionStyle={transition}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});
