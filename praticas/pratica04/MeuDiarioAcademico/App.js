import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View, Switch, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_TITLE, INPUT_PLACEHOLDER, BUTTON_TEXT, LIST_TITLE, } from './label';

export default function App() {
  const [nome, setNome] = useState('');
  const [mostrarObrigatorias, setMostrarObrigatorias] = useState(false);

  const disciplinas = [
    'Banco de Dados',
    'Programação Web',
    'Engenharia de Software',
    'Desenvolvimento Mobile',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>{APP_TITLE}</Text>

      <View style={styles.linha}>
        <TextInput
          style={styles.input}
          placeholder={INPUT_PLACEHOLDER}
          value={nome}
          onChangeText={setNome}
        />

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressionado,
          ]}
        >
          <Text style={styles.textoBotao}>{BUTTON_TEXT}</Text>
        </Pressable>
      </View>

      <View style={styles.opcoes}>
        <Text>Mostrar apenas obrigatórias</Text>

        <Switch
          value={mostrarObrigatorias}
          onValueChange={setMostrarObrigatorias}
        />
      </View>

      <Text style={styles.tituloLista}>{LIST_TITLE}</Text>

      <View style={styles.lista}>
        {disciplinas.map((disciplina, index) => (
          <Text key={index} style={styles.item}>
            {disciplina}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  linha: {
    flexDirection: 'row',


    justifyContent: 'space-between',


    alignItems: 'center',

    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },

  botao: {
    width: '28%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoPressionado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  opcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  lista: {
    flex: 1,
  },

  item: {
    margin: 5,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});