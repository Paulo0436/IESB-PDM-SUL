
import { View, Text, StyleSheet } from 'react-native';

function getDataFormatada(data) {
  const dataDespesa = new Date(data);

  return (
    dataDespesa.getDate() +
    '/' +
    (dataDespesa.getMonth() + 1) +
    '/' +
    dataDespesa.getFullYear()
  );
}

export default function DespesaItem({ despesa }) {
  return (
    <View style={styles.container}>
      <View style={styles.informacoes}>
        <Text style={styles.descricao}>{despesa.descricao}</Text>
        <Text style={styles.data}>
          {getDataFormatada(despesa.data)}
        </Text>
        <Text style={styles.categoria}>
          {despesa.categoria}
        </Text>
      </View>

      <Text style={styles.valor}>
        R$ {Number(despesa.valor).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 14,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  informacoes: {
    flex: 1,
    gap: 5,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  data: {
    color: '#666666',
    fontSize: 13,
  },
  categoria: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 12,
  },
  valor: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
