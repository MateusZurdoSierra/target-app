import { router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text>In Progress: {id}</Text>
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
