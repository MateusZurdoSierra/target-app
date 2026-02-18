import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme/colors";

export const Loading = () => {
  return (
    <ActivityIndicator
      style={styles.container}
      size="large"
      color={colors.blue[500]}
    />
  );
};
