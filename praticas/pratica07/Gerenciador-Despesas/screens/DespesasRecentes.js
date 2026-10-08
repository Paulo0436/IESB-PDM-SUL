
import { View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({ despesas }) {
  const agora = new Date();
  const limite = new Date(agora);
  limite.setDate(agora.getDate() - 7);

  const despesasRecentes = despesas.filter((despesa) => {
    const dataDespesa = new Date(despesa.data);
    return dataDespesa >= limite && dataDespesa <= agora;
  });

  return (
    <View style={styles.container}>
      <DespesaSaida
        despesas={despesasRecentes}
        periodo="Últimos 7 dias"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});
