import { View, StatusBar } from "react-native";
import { router } from "expo-router";

import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";

const summary = {
  total: "R$ 2.680,00",
  input: {
    label: "Entradas",
    value: "R$ 1.000,00",
  },
  output: {
    label: "Saídas",
    value: "R$ 1.000,00",
  },
};

const targets = [
  {
    id: "1",
    name: "Comprar uma cadeira ergonômica",
    percentage: "50%",
    current: "R$ 1.000,00",
    target: "R$ 2.000,00",
  },
  {
    id: "2",
    name: "Comprar um notebook",
    percentage: "20%",
    current: "R$ 500,00",
    target: "R$ 2.500,00",
  },
  {
    id: "3",
    name: "Comprar um celular",
    percentage: "30%",
    current: "R$ 1.000,00",
    target: "R$ 3.000,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        keyExtractor={(item) => item.id}
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        title="Metas"
        emptyMessage="Nenhuma meta encontrada"
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
