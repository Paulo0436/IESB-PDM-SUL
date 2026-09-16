import React from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma meta de estudo"
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        onPress={onAdd}
        android_ripple={{ color: '#ffffff55' }}
      >
        <Text style={styles.textoBotao}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  botaoPressionado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});