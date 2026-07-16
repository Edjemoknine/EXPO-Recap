import { useSignIn } from "@clerk/expo";
import { MaterialIcons } from "@expo/vector-icons";
import { Href, Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "./InputField";

const ResetPasswordCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isRequested, setIsRequested] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { signIn } = useSignIn();

  const onRequestReset = async () => {
    const { error: createError } = await signIn.create({
      identifier: email,
    });
    if (createError) {
      Alert.alert("Error", JSON.stringify(createError, null, 2));
      return;
    }
    const { error: sendCodeError } =
      await signIn.resetPasswordEmailCode.sendCode();
    if (sendCodeError) {
      Alert.alert("Error", JSON.stringify(sendCodeError, null, 2));
      return;
    }

    setIsRequested(true);
  };
  const onVerifyCode = async () => {
    try {
      const { error } = await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });
      if (error) {
        Alert.alert("Error", JSON.stringify(error, null, 2));
        return;
      }
      setIsRequested(false);
      setIsVerified(true);
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error, null, 2) + "");
    }
  };

  async function submitNewPassword() {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password,
      // Optional: sign the user out of all other authenticated sessions
      signOutOfOtherSessions: true,
    });
    if (error) {
      Alert.alert("Error", JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      const { error } = await signIn.finalize({
        navigate: async ({ session, decorateUrl }) => {
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          // If no session tasks, navigate the signed-in user to the home page
          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });

      if (error) {
        Alert.alert("Error", JSON.stringify(error, null, 2));
        return;
      }
      setIsVerified(false);
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else {
      // Check why the sign-in is not complete
      Alert.alert(
        "Error",
        "Sign-in attempt not complete:" + JSON.stringify(signIn, null, 2),
      );
    }
  }
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {!isRequested && !isVerified && (
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="lock-reset" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we’ll send you instructions to recover your
              account.
            </Text>
          </View>

          <InputField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            icon={<MaterialIcons name="email" size={20} color="#666" />}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={onRequestReset}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Send Reset Link</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Remembered your password?</Text>
            <Link href="/(auth)/login" style={styles.footerLink}>
              Sign In
            </Link>
          </View>
        </View>
      )}

      {isRequested && !isVerified && (
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="lock-reset" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.title}>Verify Code</Text>
            <Text style={styles.subtitle}>
              Enter the code sent to your email to reset your password.
            </Text>
          </View>

          <InputField
            label="Reset Code"
            placeholder="Enter the code sent to your email"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            icon={<MaterialIcons name="key" size={20} color="#666" />}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={onVerifyCode}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Verify Code</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Remembered your password?</Text>
            <Link href="/(auth)/login" style={styles.footerLink}>
              Sign In
            </Link>
          </View>
        </View>
      )}

      {signIn.status === "needs_new_password" && isVerified && (
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="lock-reset" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we’ll send you instructions to recover your
              account.
            </Text>
          </View>

          <InputField
            label="Password"
            placeholder="Enter your new password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon={<MaterialIcons name="lock" size={20} color="#666" />}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitNewPassword}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Update Password</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Remembered your password?</Text>
            <Link href="/(auth)/login" style={styles.footerLink}>
              Sign In
            </Link>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ResetPasswordCard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    paddingBottom: 36,
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
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  footerLink: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "700",
    marginLeft: 4,
  },
});
