import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import { Post, posts } from "../../../data/mock";

function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <View style={styles.post}>
      <View style={styles.row}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.meta}>
            @{post.username} · {post.time}
          </Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={18} color={colors.textMuted} />
      </View>

      <Text style={styles.text}>{post.text}</Text>

      {post.image && (
        <View style={styles.imageContainer}>
          <Image source={post.image} style={styles.image} resizeMode="cover" />
        </View>
      )}

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={() => setLiked((l) => !l)} hitSlop={8}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? colors.purpleLight : colors.textMuted}
          />
          <Text style={[styles.actionText, liked && { color: colors.purpleLight }]}>{likeCount}</Text>
        </Pressable>
        <View style={styles.action}>
          <Ionicons name="chatbubble-outline" size={19} color={colors.textMuted} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="arrow-redo-outline" size={20} color={colors.textMuted} />
        </View>
      </View>
    </View>
  );
}

export default function Home() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  headerTitle: { color: colors.text, fontSize: 20, fontWeight: "700" },
  post: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    width: "100%",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.purpleBorder,
  },
  name: { color: colors.text, fontSize: 15, fontWeight: "700" },
  meta: { color: colors.textMuted, fontSize: 13, marginTop: 1 },
  text: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: 12 },
  imageContainer: {
    width: "100%",
    height: 220, // Prevents intrinsic image size from blowing out layout width
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
  },
  actions: { flexDirection: "row", gap: 28, marginTop: 14 },
  action: { flexDirection: "row", alignItems: "center", gap: 6 },
  actionText: { color: colors.textMuted, fontSize: 13, fontWeight: "600" },
});