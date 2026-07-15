import { AuthCard, AuthHeader } from "@/components/auth";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
  return (
    <LinearGradient colors={["#4CAF50", "#45a049"]} style={styles.container}>
      <View style={styles.content}>
        <AuthHeader title="TravelWays" showLogo={true} />
        <AuthCard isLogin={true} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
});
