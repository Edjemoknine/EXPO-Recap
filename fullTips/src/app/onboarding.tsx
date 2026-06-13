import { useOnboarding } from "@/providers/onboarding-provider";
import { router } from "expo-router";
import { Image, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const onboarding = () => {
  const { completeOnboarding } = useOnboarding();

  const finish = () => {
    completeOnboarding();

    router.replace("/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <Onboarding
        onDone={finish}
        onSkip={finish}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={{ width: 300, height: 300 }}
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
                style={{ width: 300, height: 300 }}
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
                style={{ width: 300, height: 300 }}
                source={require("../../assets/images/done.png")}
              />
            ),
            title: "Accomplish your goals",
            subtitle: "This is a simple onboarding screen for your app.",
          },
        ]}
      />
    </View>
  );
};

export default onboarding;
