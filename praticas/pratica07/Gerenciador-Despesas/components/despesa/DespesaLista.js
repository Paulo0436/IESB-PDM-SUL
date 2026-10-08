
import { FlatList, Text, StyleSheet } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem despesa={item} />
      )}
      ListEmptyComponent={
        <Text style={styles.vazio}>
          Nenhuma despesa encontrada.
        </Text>
      }
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: 12,
    flexGrow: 1,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666666',
  },
});
