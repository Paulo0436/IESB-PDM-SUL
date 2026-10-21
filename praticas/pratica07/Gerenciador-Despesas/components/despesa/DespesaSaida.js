
import { View } from 'react-native';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ expenses, periodo, theme }) {
  return (
    <View style={{ flex: 1 }}>
      <DespesaLista
        expenses={expenses}
        periodo={periodo}
        theme={theme}
      />
    </View>
  );
}
