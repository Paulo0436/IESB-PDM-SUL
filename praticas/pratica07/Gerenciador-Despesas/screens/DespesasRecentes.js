
import { View, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { themes } from '../constants/theme';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const scheme = useColorScheme();
  const theme = themes[scheme === 'dark' ? 'dark' : 'light'];

  const agora = new Date();
  const limite = new Date(agora);
  limite.setDate(agora.getDate() - 7);

  const despesasRecentes = expenses.filter((expense) => {
    const data = new Date(expense.date);
    return data >= limite && data <= agora;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <DespesaSaida
        expenses={despesasRecentes}
        periodo="Últimos 7 dias"
        theme={theme}
      />
    </View>
  );
}
