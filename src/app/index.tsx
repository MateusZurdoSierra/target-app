import { fontFamily } from "@/theme/fontFamily";
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Button title="Go to Target" onPress={() => router.navigate("/target")} />
      <Button
        title="Go to Transaction"
        onPress={() => router.navigate("/transaction/123")}
      />
      <Button
        title="Go to In Progress"
        onPress={() => router.navigate("/in-progress/123")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: fontFamily.bold,
  },
});
