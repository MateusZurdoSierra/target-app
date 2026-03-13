import { useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { TransactionType } from "@/components/TransactionType";
import { CurrencyInput } from "@/components/CurrencyInput";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { TransactionTypes } from "@/utils/TransactionTypes";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedType, setSelectedType] = useState<TransactionTypes>(
    TransactionTypes.Input,
  );
  const { id } = useLocalSearchParams<{ id: string }>();

  const transactionsDatabase = useTransactionsDatabase();

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert("Atenção", "Preencher o valor da transação.");
      }

      setIsCreating(true);

      await transactionsDatabase.create({
        target_id: Number(id),
        amount: selectedType === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      });

      Alert.alert("Transação criada", "Transação criada com sucesso.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a transação.");
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo de alcançar sua meta. Se esforce para guardar e evitar retirar"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={selectedType} onChange={setSelectedType} />

        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Aluguel, alimentação, etc."
          value={observation}
          onChangeText={setObservation}
        />

        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
