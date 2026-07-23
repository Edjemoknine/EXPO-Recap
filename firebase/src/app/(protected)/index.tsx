import { authService } from "@/auth/auth.service";
import { log } from "@react-native-firebase/app/dist/module/internal/web/firebaseFirestorePipelines";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const signOut = async () => {
    try {
      await authService.logout();
    } catch (error: any) {
      log("Error signing out:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Expo Firebase App</Text>
      <Text style={{ marginTop: 16, textAlign: "center" }}>
        <Text style={{ color: "blue" }} onPress={signOut}>
          Sign Out
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
