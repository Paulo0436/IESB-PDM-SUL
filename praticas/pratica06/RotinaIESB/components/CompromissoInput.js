import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={labels.placeholderCompromisso}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        onPress={onAdd}
        android_ripple={{ color: '#ffffff55' }}
      >
        <Text style={styles.textoBotao}>
          {labels.botaoAdicionar}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
  },

  botao: {
    width: '28%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#333',
    alignItems: 'center',
  },

  botaoPressionado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});