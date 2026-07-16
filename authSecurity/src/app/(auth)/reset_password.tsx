import { AuthHeader, ResetPasswordCard } from "@/components/auth";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

const ResetPass = () => {
  return (
    <LinearGradient colors={["#4CAF50", "#45a049"]} style={styles.container}>
      <View style={styles.content}>
        <AuthHeader title="TravelWays" showLogo={true} />
        <ResetPasswordCard />
      </View>
    </LinearGradient>
  );
};

export default ResetPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
