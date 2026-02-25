import { View } from "react-native";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { Transaction } from "@/components/Transaction";
import { Button } from "@/components/Button";

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const details = {
    current: "R$ 1.000,00",
    target: "R$ 2.000,00",
    percentage: 50,
  };

  const transactions = [
    {
      id: "1",
      type: TransactionTypes.Input,
      value: "R$ 1.000,00",
      date: "25/02/2026",
      description: "CDB 12 meses",
    },
    {
      id: "2",
      type: TransactionTypes.Output,
      value: "R$ 500,00",
      date: "25/02/2026",
      description: "Aluguel",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Meta em progresso"
        subtitle="Veja o progresso da sua meta"
        rightButton={{
          onPress: () => {},
          icon: "edit",
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        emptyMessage="Nenhuma transação encontrada"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${id}`)}
      />
    </View>
  );
}
