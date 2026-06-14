import { useAuth } from "@/providers/auth-provider";
import { useOnboarding } from "@/providers/onboarding-provider";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { runOnJS } from "react-native-worklets";

const customOnboarding = () => {
  const [selected, setSelected] = useState(0);
  const { login } = useAuth();
  const { completeOnboarding, hasOnboarded } = useOnboarding();
  const currentData = data[selected];

  const handleNext = () => {
    if (selected < data.length - 1) {
      setSelected(selected + 1);
    } else {
      onboardingComplete();
    }
  };
  const onboardingComplete = () => {
    completeOnboarding();
    login("fake-token");
    router.push("/");
    setSelected(0);
  };

  const onPrev = () => {
    if (selected > 0) {
      setSelected(selected - 1);
    }
  };

  const gestureLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      runOnJS(handleNext)();
    });
  const gestureRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      runOnJS(onPrev)();
    });

  const gesture = Gesture.Simultaneous(gestureLeft, gestureRight);

  return (
    <SafeAreaView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={{ flex: 1 }}>
          {currentData.image}
          <View style={styles.content}>
            <Animated.Text
              entering={FadeInLeft.delay(100)}
              exiting={FadeInRight}
              style={styles.title}
            >
              {currentData.title}
            </Animated.Text>
            <Animated.Text
              entering={FadeInLeft.delay(200)}
              exiting={FadeInRight}
              style={styles.subtitle}
            >
              {currentData.subtitle}
            </Animated.Text>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={onboardingComplete}>
                <Text>Skip</Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: "#483ff5" }]}
                onPress={handleNext}
              >
                <Text style={{ color: "white" }}>Get Started</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default customOnboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  content: {
    marginTop: "auto",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },
  button: {
    width: 120,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    color: "white",
  },
});
const data = [
  {
    backgroundColor: "#fff",
    image: (
      <Image
        style={styles.image}
        source={require("../../assets/images/people/4807.jpg")}
      />
    ),
    title: "Onboarding",
    subtitle: "Done with React Native Onboarding Swiper",
  },
  {
    backgroundColor: "#fff",
    image: (
      <Image
        style={styles.image}
        source={require("../../assets/images/learn.png")}
      />
    ),
    title: "Hit the ground running",
    subtitle: "This is a simple onboarding screen for your app.",
  },
  {
    backgroundColor: "#fff",
    image: (
      <Image
        style={styles.image}
        source={require("../../assets/images/done.png")}
      />
    ),
    title: "Accomplish your goals",
    subtitle: "This is a simple onboarding screen for your app.",
  },
];
