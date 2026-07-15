import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  showLogo?: boolean;
  title?: string;
};

const AuthHeader = ({ showLogo = true, title = "TravelWays" }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      {showLogo && (
        <View style={styles.logoContainer}>
          <MaterialIcons name="flight" size={64} color="#4CAF50" />
        </View>
      )}
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.taglineText}>Your travel companion</Text>
    </SafeAreaView>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 12,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  taglineText: {
    fontSize: 13,
    color: "#999",
    letterSpacing: 0.5,
  },
});
