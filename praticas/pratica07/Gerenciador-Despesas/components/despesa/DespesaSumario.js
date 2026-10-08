
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + Number(item.valor),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>

      <Text
        style={[
          styles.valor,
          somaDespesas > 200 && styles.valorAlerta,
        ]}
      >
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
    padding: 18,
    margin: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: {
    color: '#ffffff',
    fontSize: 16,
  },
  valor: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  valorAlerta: {
    color: '#ff5252',
  },
});
