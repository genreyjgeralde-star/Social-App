import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../components/Button";
import { colors } from "../../../theme/colors";
import { currentUser as user } from "../../../data/mock";

const details: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "mail-outline", label: user.email },
  { icon: "location-outline", label: user.location },
  { icon: "link-outline", label: user.website },
  { icon: "calendar-outline", label: user.joined },
];

const stats = [
  { label: "Posts", value: user.posts },
  { label: "Followers", value: user.followers },
  { label: "Following", value: user.following },
];

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner} />

        <View style={styles.body}>
          <Image source={user.avatar} style={styles.avatar} />

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>

          <View style={{ marginTop: 16 }}>
            <Button
              title="Edit profile"
              variant="outline"
              onPress={() => {
                // TODO: navigate to edit profile screen
              }}
            />
          </View>

          <View style={styles.stats}>
            {stats.map((s, i) => (
              <View key={s.label} style={[styles.stat, i > 0 && styles.statDivider]}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            {details.map((d, i) => (
              <View key={d.label} style={[styles.detailRow, i > 0 && styles.detailBorder]}>
                <Ionicons name={d.icon} size={18} color={colors.purpleLight} />
                <Text style={styles.detailText}>{d.label}</Text>
              </View>
            ))}
          </View>

          <Pressable style={styles.logout} onPress={() => router.replace("/login")}>
            <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  banner: { height: 120, backgroundColor: colors.purpleSoft, borderBottomWidth: 1, borderBottomColor: colors.purpleBorder },
  body: { paddingHorizontal: 20, paddingBottom: 32 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginTop: -48,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 4,
    borderColor: colors.bg,
  },
  name: { color: colors.text, fontSize: 24, fontWeight: "700", marginTop: 12 },
  username: { color: colors.textMuted, fontSize: 15, marginTop: 2 },
  bio: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: 12 },
  stats: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 14,
  },
  stat: { flex: 1, alignItems: "center" },
  statDivider: { borderLeftWidth: 1, borderLeftColor: colors.border },
  statValue: { color: colors.text, fontSize: 18, fontWeight: "700" },
  statLabel: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  card: {
    marginTop: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14 },
  detailBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  detailText: { color: colors.text, fontSize: 15 },
  logout: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24, padding: 12 },
  logoutText: { color: colors.danger, fontSize: 15, fontWeight: "600" },
});
