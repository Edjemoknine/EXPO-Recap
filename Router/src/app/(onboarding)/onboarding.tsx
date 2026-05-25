import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  return (
    <SafeAreaView>
      <View
      // style={{
      //   backgroundColor: "lightblue",
      //   padding: 20,
      // }}
      >
        <Text>
          TThis is the onboarding screen. You can navigate to this screen from
          the profile screen by clicking the "Go to Onboarding Screen" link. You
          can also
        </Text>
        <Pressable
          style={{
            marginTop: 20,
            backgroundColor: "red",
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => {
            router.push("/");
          }}
        >
          <Text style={{ color: "white" }}>Go to Home Screen</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
