import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  useNavigation,
  createStaticNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@react-navigation/elements";

import Animated, { FadeIn, SharedTransition } from "react-native-reanimated";

export default function DetailsScreen() {
  const navigation = useNavigation();
  const transition = SharedTransition.duration(550).springify();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: "https://picsum.photos/id/39/200" }}
        style={{ width: 400, height: 400, borderRadius: 10, marginBottom: 10 }}
        sharedTransitionTag="tag"
        sharedTransitionStyle={transition}
      />
      <Button onPress={() => navigation.goBack()}>Go back</Button>
      <Animated.View
        entering={FadeIn.duration(300).delay(400)}
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
