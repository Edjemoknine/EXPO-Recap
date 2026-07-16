import { useSignUp } from "@clerk/expo";
import { MaterialIcons } from "@expo/vector-icons";
import { Href, Link, router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputField from "./InputField";

const VerifyEmailCard = () => {
  const [code, setCode] = useState("");
  const { signUp } = useSignUp();

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });
    if (signUp.status === "complete") {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
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
    } else {
      // Check why the sign-up is not complete
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="mark-email-read" size={28} color="#4CAF50" />
          </View>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit verification code to your inbox. Enter it below to
            continue.
          </Text>
        </View>

        <InputField
          label="Verification Code"
          placeholder="Enter 6-digit code"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
          icon={<MaterialIcons name="vpn-key" size={20} color="#666" />}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleVerify}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Verify Email</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive a code?</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Resend</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryLink}>
          <Link href="/(auth)/login" style={styles.secondaryLinkText}>
            Back to Sign In
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default VerifyEmailCard;

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
    marginLeft: 6,
  },
  secondaryLink: {
    alignItems: "center",
    marginTop: 14,
  },
  secondaryLinkText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "700",
  },
});
