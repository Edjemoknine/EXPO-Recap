import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "./InputField";
import SocialAuthButtons from "./SocialAuthButtons";

type Props = {
  isLogin?: boolean;
};

const AuthCard = ({ isLogin = true }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    // Handle login/signup logic
    console.log({
      fullName,
      email,
      password,
      rememberMe,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {isLogin ? "Welcome Back" : "Let's get started"}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin ? "Sign In to continue" : "Sign Up to continue"}
          </Text>
        </View>

        {/* Social Auth Buttons */}
        <SocialAuthButtons />

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or Continue with</Text>
          <View style={styles.divider} />
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {!isLogin && (
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              icon={<MaterialIcons name="person" size={20} color="#666" />}
            />
          )}
          <InputField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            icon={<MaterialIcons name="email" size={20} color="#666" />}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon={<MaterialIcons name="lock" size={20} color="#666" />}
          />
        </View>

        {/* Remember Me & Forgot Password */}
        {isLogin && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <MaterialIcons
                name={rememberMe ? "check-box" : "check-box-outline-blank"}
                size={20}
                color={rememberMe ? "#4CAF50" : "#999"}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {isLogin ? "Sign In" : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* Sign Up / Sign In Link */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>
            {isLogin ? "Don't have account? " : "Already have account? "}
          </Text>
          <TouchableOpacity>
            <Text style={styles.linkButton}>
              {isLogin ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AuthCard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    fontSize: 12,
    color: "#999",
    paddingHorizontal: 12,
  },
  formContainer: {
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rememberText: {
    fontSize: 13,
    color: "#666",
  },
  forgotPassword: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#666",
  },
  linkButton: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "700",
  },
});
