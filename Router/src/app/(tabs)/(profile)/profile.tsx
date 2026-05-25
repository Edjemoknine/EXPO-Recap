import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Text>profile</Text>
      </View>
      <Link href="/onboarding">
        <Text>Go to Onboarding Screen</Text>
      </Link>
    </SafeAreaView>
  );
};

export default profile;
