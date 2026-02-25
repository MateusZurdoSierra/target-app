import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 48,
    width: "100%",
    borderRadius: 8,
    backgroundColor: colors.blue[500],
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
});
