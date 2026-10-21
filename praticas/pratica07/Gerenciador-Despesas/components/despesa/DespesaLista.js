
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';

export default function DespesaLista({ expenses, periodo, theme }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <DespesaItem expense={item} />
      )}
      ListHeaderComponent={
        <DespesaSumario
          expenses={expenses}
          periodo={periodo}
          theme={theme}
        />
      }
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons
            name="receipt-outline"
            size={55}
            color={theme.secondary}
          />

          <Text style={[styles.titulo, { color: theme.text }]}>
            Nenhuma despesa encontrada
          </Text>

          <Text style={{ color: theme.secondary, textAlign: 'center' }}>
            Toque em + para adicionar uma despesa.
          </Text>
        </View>
      }
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    gap: 12,
  },
  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
