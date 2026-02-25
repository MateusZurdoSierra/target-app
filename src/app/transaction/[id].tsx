import { View } from "react-native";
import { CurrencyInput } from "@/components/CurrencyInput";
import { PageHeader } from "@/components/PageHeader";
import { router, useLocalSearchParams } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { TransactionType } from "@/components/TransactionType";
import { useState } from "react";

export default function Transaction() {
  const [selectedType, setSelectedType] = useState<TransactionTypes>(
    TransactionTypes.Input,
  );
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo de alcançar sua meta. Se esforce para guardar e evitar retirar"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={selectedType} onChange={setSelectedType} />

        <CurrencyInput label="Valor (R$)" value={0} />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Aluguel, alimentação, etc."
        />

        <Button title="Salvar" onPress={() => router.back()} />
      </View>
    </View>
  );
}
