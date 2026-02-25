import { StyleSheet } from "react-native";
import { colors } from "@/theme";
import { fontFamily } from "@/theme";

export const styles = StyleSheet.create({
  container: { width: "100%" },
  label: {
    color: colors.gray[500],
    fontSize: 12,
    fontFamily: fontFamily.medium,
    marginBottom: 5,
  },
  status: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  value: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: colors.black,
    flex: 1,
  },
  target: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
  },
  percentage: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.blue[500],
  },
  progress: {
    width: "100%",
    height: 5,
    backgroundColor: colors.gray[300],
    borderRadius: 5,
    marginTop: 16,
    overflow: "hidden",
  },
  currentProgress: {
    height: 5,
    backgroundColor: colors.blue[500],
  },
});
