
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function GerenciarDespesa({ navigation, onSalvar }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [categoria, setCategoria] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  function tratarValor(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      setValor(texto);
    }
  }

  function onChangeData(event, dataSelecionada) {
    setShowPicker(false);

    if (dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function salvarDespesa() {
    const valorNumerico = Number(valor);

    if (!descricao.trim() || !valor.trim() || !categoria) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha a descrição, o valor e a categoria.'
      );
      return;
    }

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Valor inválido', 'Informe um valor maior que zero.');
      return;
    }

    onSalvar({
      id: String(Date.now()),
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
      categoria,
    });

    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Almoço"
        value={descricao}
        onChangeText={setDescricao}
        maxLength={80}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 35.50"
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Data da despesa</Text>
      <Pressable
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text>
          {data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={onChangeData}
          maximumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategoria(item)}
            style={[
              styles.botaoCategoria,
              categoria === item && styles.categoriaSelecionada,
            ]}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoria === item && styles.textoSelecionado,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.botaoSalvar} onPress={salvarDespesa}>
        <Text style={styles.textoSalvar}>Salvar despesa</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  botaoCategoria: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#e5e7eb',
  },
  categoriaSelecionada: {
    backgroundColor: '#2563eb',
  },
  textoCategoria: {
    color: '#111827',
  },
  textoSelecionado: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoSalvar: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
