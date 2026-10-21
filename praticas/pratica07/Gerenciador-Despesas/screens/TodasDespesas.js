
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { themes, CATEGORIES } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const scheme = useColorScheme();
  const theme = themes[scheme === 'dark' ? 'dark' : 'light'];

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const debouncedSearch = useDebounce(search);

  const filteredExpenses = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return expenses.filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(query);

      const matchesCategory =
        category === 'Todas' || expense.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, debouncedSearch, category]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <TextInput
        placeholder="Buscar por descrição..."
        placeholderTextColor={theme.secondary}
        value={search}
        onChangeText={setSearch}
        style={[
          styles.input,
          {
            backgroundColor: theme.input,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtros}
      >
        {['Todas', ...CATEGORIES].map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[
              styles.botaoCategoria,
              {
                backgroundColor:
                  category === item ? theme.primary : theme.card,
              },
            ]}
          >
            <Text
              style={{
                color:
                  category === item
                    ? scheme === 'dark' ? '#111827' : '#ffffff'
                    : theme.text,
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <DespesaSaida
        expenses={filteredExpenses}
        periodo="Todas as despesas"
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 12,
    padding: 13,
    borderWidth: 1,
    borderRadius: 8,
  },
  filtros: {
    flexGrow: 0,
    maxHeight: 55,
  },
  botaoCategoria: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    alignSelf: 'center',
  },
});
