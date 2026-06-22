import { useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";

const profile = () => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const width = useSharedValue(100);
  const handlePress = () => {
    width.value = withSpring(Math.random() * 100 + 50);
  };

  const translateX = useSharedValue<number>(0);

  const handlePressStyle = () => {
    translateX.value += 50;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value * 2) }],
  }));

  const r = useSharedValue(10);
  const handlePressRadius = () => {
    r.value += 10;
  };
  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value),
  }));

  const changedAnim = useSharedValue<number>(100 / 2 - 160);

  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: changedAnim.value }],
  }));

  useEffect(() => {
    changedAnim.value = withRepeat(
      withSpring(-changedAnim.value, {
        mass: 10,
        damping: 40,
      }),
      -1,
      true,
    );
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainBox}>
        <Animated.View
          style={{
            width,
            height: 120,
            backgroundColor: "violet",
            borderRadius: 20,
          }}
        />
        <Button onPress={handlePress} title="Click me" />
      </View>

      <View style={styles.mainBox}>
        <Animated.View style={[styles.box, animatedStyles]} />
        <Button onPress={handlePressStyle} title="Click me" />
      </View>
      <View style={styles.mainBox}>
        <Svg style={styles.svg}>
          <AnimatedCircle
            cx="50"
            cy="50"
            r={r}
            fill="blue"
            animatedProps={animatedProps}
          />
        </Svg>

        <Button onPress={handlePressRadius} title="Click Raduis" />
      </View>

      <Animated.View style={[styles.box, animatedChanged]}>
        <Text>Heavy</Text>
      </Animated.View>
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    // flexDirection: "row",
    padding: 20,
  },
  mainBox: {
    flex: 1,
    padding: 5,
    gap: 5,
    width: "100%",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
  svg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: "100%",
    backgroundColor: "yellow",
  },
});
