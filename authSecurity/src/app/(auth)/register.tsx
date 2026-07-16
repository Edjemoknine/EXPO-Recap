import { AuthCard, AuthHeader } from "@/components/auth";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

const Register = () => {
  return (
    <LinearGradient colors={["#4CAF50", "#45a049"]} style={styles.container}>
      <View style={styles.content}>
        <AuthHeader title="TravelWays" showLogo={true} />
        <AuthCard isLogin={false} />
      </View>
    </LinearGradient>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
