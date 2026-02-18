import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Target() {
  return (
    <View style={styles.container}>
      <Text>Target</Text>
      <Button title="Go to Index" onPress={() => router.navigate("/")} />
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
});
