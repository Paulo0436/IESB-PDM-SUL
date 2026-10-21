
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ expenses, periodo, theme }) {
  const total = expenses.reduce(
    (soma, expense) => soma + Number(expense.amount),
    0
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.summary }]}>
      <View>
        <Text style={styles.periodo}>{periodo}</Text>
        <Text style={styles.quantidade}>
          {expenses.length} despesa(s)
        </Text>
      </View>

      <Text style={styles.valor}>
        R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 18,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  quantidade: {
    color: '#d1d5db',
    marginTop: 4,
  },
  valor: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
