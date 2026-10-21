
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themes } from '../../constants/theme';

export default function DespesaItem({ expense }) {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const theme = themes[scheme === 'dark' ? 'dark' : 'light'];

  function abrirEdicao() {
    navigation.navigate('GerenciarDespesa', {
      expenseId: expense.id,
    });
  }

  return (
    <Pressable
      onPress={abrirEdicao}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: theme.card },
        pressed && { opacity: 0.6 },
      ]}
    >
      <View style={styles.informacoes}>
        <Text style={[styles.descricao, { color: theme.text }]}>
          {expense.description}
        </Text>

        <Text style={{ color: theme.secondary }}>
          {new Date(expense.date).toLocaleDateString('pt-BR')}
        </Text>

        <View style={[styles.categoria, { backgroundColor: theme.input }]}>
          <Text style={{ color: theme.text }}>
            {expense.category}
          </Text>
        </View>
      </View>

      <Text style={[styles.valor, { color: theme.text }]}>
        R$ {Number(expense.amount).toFixed(2)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  informacoes: {
    flex: 1,
    gap: 5,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoria: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  valor: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
