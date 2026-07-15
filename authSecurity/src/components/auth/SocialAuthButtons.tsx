import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SocialAuthButtons = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Add your social authentication logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => handleSocialLogin("Facebook")}
        activeOpacity={0.7}
      >
        <FontAwesome name="facebook" size={20} color="#1877F2" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => handleSocialLogin("Google")}
        activeOpacity={0.7}
      >
        <FontAwesome name="google" size={20} color="#EA4335" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => handleSocialLogin("Twitter")}
        activeOpacity={0.7}
      >
        <FontAwesome name="twitter" size={20} color="#1DA1F2" />
      </TouchableOpacity>
    </View>
  );
};

export default SocialAuthButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
