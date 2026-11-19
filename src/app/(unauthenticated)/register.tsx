import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Field from "../../components/Field";
import Button from "../../components/Button";
import { colors } from "../../theme/colors";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = confirm.length > 0 && password !== confirm;

  const onRegister = () => {
    if (mismatch) return;
    // TODO: call your register API here
    router.replace("/(authenticated)/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logo}>
            <Ionicons name="person-add" size={26} color="#fff" />
          </View>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Join your team in a few seconds.</Text>

          <View style={styles.card}>
            <Field
              label="Name"
              icon="person-outline"
              placeholder="Your full name"
              value={name}
              onChangeText={setName}
              autoComplete="name"
            />
            <Field
              label="Email"
              icon="mail-outline"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
            <Field
              label="Password"
              icon="lock-closed-outline"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secure
              autoCapitalize="none"
            />
            <Field
              label="Confirm password"
              icon="shield-checkmark-outline"
              placeholder="Re-enter your password"
              value={confirm}
              onChangeText={setConfirm}
              secure
              autoCapitalize="none"
            />
            {mismatch && <Text style={styles.error}>Passwords don't match.</Text>}
            <Button title="Create account" onPress={onRegister} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/login" style={styles.link}>
              Log in
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: { color: colors.text, fontSize: 26, fontWeight: "700", textAlign: "center" },
  subtitle: { color: colors.textMuted, fontSize: 15, textAlign: "center", marginTop: 6, marginBottom: 28 },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 20,
  },
  error: { color: colors.danger, fontSize: 13, marginTop: -6, marginBottom: 14 },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.purpleBorder,
    borderRadius: 12,
    backgroundColor: colors.purpleSoft,
  },
  footerText: { color: colors.textMuted, fontSize: 14 },
  link: { color: colors.purpleLight, fontSize: 14, fontWeight: "700" },
});
