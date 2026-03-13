import { View, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

type SavedValue = {
  current: string;
  target: string;
  percentage: number;
};

type Props = {
  data: SavedValue;
};

export function Progress({ data }: Props) {
  const isNegative = data.percentage < 0;
  const barColor = isNegative ? colors.red[400] : colors.blue[500];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor guardado</Text>

      <View style={styles.status}>
        <Text style={styles.value}>
          {data.current} <Text style={styles.target}>de {data.target}</Text>
        </Text>

        <Text style={[styles.percentage, { color: barColor }]}>
          {data.percentage.toFixed(0)}%
        </Text>
      </View>

      <View style={styles.progress}>
        <View
          style={[
            styles.currentProgress,
            {
              width: `${Math.abs(data.percentage)}%`,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>
    </View>
  );
}
