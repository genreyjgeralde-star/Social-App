import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
};

export default function Button({ title, onPress, variant = "primary" }: Props) {
  const outline = variant === "outline";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        outline ? styles.outline : styles.primary,
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={[styles.text, outline && { color: colors.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { height: 48, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  primary: { backgroundColor: colors.purple },
  outline: { backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border },
  text: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
