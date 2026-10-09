
import { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

const CATEGORIAS = [
  'Todas',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function TodasDespesas({ despesas }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas = despesas.filter((despesa) => {
    return (
      categoriaSelecionada === 'Todas' ||
      despesa.categoria === categoriaSelecionada
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Filtrar por categoria</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtros}
      >
        {CATEGORIAS.map((categoria) => (
          <Pressable
            key={categoria}
            onPress={() => setCategoriaSelecionada(categoria)}
            style={[
              styles.botaoCategoria,
              categoriaSelecionada === categoria &&
                styles.botaoSelecionado,
            ]}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoriaSelecionada === categoria &&
                  styles.textoSelecionado,
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={
          categoriaSelecionada === 'Todas'
            ? 'Todas as despesas'
            : categoriaSelecionada
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: 12,
  },
  filtros: {
    flexGrow: 0,
    maxHeight: 55,
  },
  botaoCategoria: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  botaoSelecionado: {
    backgroundColor: '#2563eb',
  },
  textoCategoria: {
    color: '#111827',
  },
  textoSelecionado: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
