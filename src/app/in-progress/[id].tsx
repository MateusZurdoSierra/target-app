import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";

import dayjs from "dayjs";

import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";

export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  const { id } = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargetDetails() {
    try {
      const response = await targetDatabase.show(Number(id));

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.");
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(Number(id));

      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          type:
            item.amount > 0 ? TransactionTypes.Input : TransactionTypes.Output,
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
          description: item.observation ?? "",
        })),
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações.");
    }
  }

  async function fetchData() {
    const detailsPromise = fetchTargetDetails();
    const transactionsPromise = fetchTransactions();

    await Promise.all([detailsPromise, transactionsPromise]);
    setIsFetching(false);
  }

  async function handleRemoveTransaction(id: string) {
    Alert.alert("Remover", "Tem certeza que deseja remover a transação?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", onPress: () => removeTransaction(id) },
    ]);
  }

  async function removeTransaction(id: string) {
    try {
      await transactionsDatabase.remove(Number(id));
      fetchData();
      Alert.alert("Transação removida", "Transação removida com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a transação.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title={details.name}
        subtitle="Veja o progresso da sua meta"
        rightButton={{
          onPress: () => router.navigate(`/target?id=${id}`),
          icon: "edit",
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        emptyMessage="Nenhuma transação encontrada"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => handleRemoveTransaction(item.id)}
          />
        )}
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${id}`)}
      />
    </View>
  );
}
