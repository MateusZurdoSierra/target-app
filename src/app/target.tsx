import { Alert, View } from "react-native";
import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();

  function handleSave() {
    if (name.trim() === "" || amount === 0) {
      Alert.alert("Atenção", "Preencha nome e valor.");
      return;
    }

    setIsProcessing(true);

    if (params.id) {
      console.log("update");
    } else {
      createTarget();
    }
  }

  async function createTarget() {
    try {
      Alert.alert("Nova Meta", "Meta criada com sucesso.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta.");
      setIsProcessing(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, apple watch, etc."
          value={name}
          onChangeText={setName}
        />
        <CurrencyInput
          label="Valor alvo (R$)"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />

        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
