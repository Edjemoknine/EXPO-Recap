import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
} from "react-native-reanimated";

const gustures = () => {
  // ** Animated
  const offset = useSharedValue<number>(0);
  const passed = useSharedValue(false);
  const style = useAnimatedStyle(() => ({
    backgroundColor: passed.value ? "red" : "blue",
    transform: [
      { translateX: offset.value },
      //   {
      //     scale: withTiming(passed.value ? 2 : 1),
      //   },
    ],
  }));
  //   ** Gesture
  const SIZE = 120;
  const BOUNDARY_OFFSET = 50;
  const width = useSharedValue<number>(0);
  const pan = Gesture.Pan()
    .onBegin(() => {
      passed.value = true;
    })
    .onChange((event) => {
      //   offset.value = event.translationX;
      offset.value += event.changeX;
    })
    .onFinalize((event) => {
      offset.value = withSpring(0);
      passed.value = false;
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [
          -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
          width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
        ],
      });
    });
  //   const tap = Gesture.Tap()
  //     .onBegin(() => {
  //       passed.value = true;
  //     })
  //     .onFinalize(() => {
  //       passed.value = false;
  //     });

  //   const gestures = Gesture.Simultaneous(pan, tap);
  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.circle, style]} />
      </GestureDetector>
      <View style={styles.cart}>
        <Text>Cart</Text>
      </View>
    </View>
  );
};

export default gustures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "yellow",
    position: "relative",
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
  cart: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});
