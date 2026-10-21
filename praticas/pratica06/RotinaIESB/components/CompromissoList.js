import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function CompromissoList({
  itens,
  onDelete,
  tituloLista,
  listaVazia,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            {listaVazia}
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressionado,
            ]}
            onPress={() => onDelete(item.id)}
            android_ripple={{ color: '#00000022' }}
          >
            <View style={styles.conteudoItem}>
              <Text style={styles.texto}>
                {item.texto}
              </Text>

              <Text style={styles.data}>
                Criado em: {item.criadoEm}
              </Text>
            </View>

            <Text style={styles.excluir}>
              Excluir
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#eeeeee',
  },

  itemPressionado: {
    opacity: 0.6,
  },

  conteudoItem: {
    flex: 1,
  },

  texto: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  data: {
    marginTop: 5,
    fontSize: 12,
  },

  excluir: {
    fontWeight: 'bold',
  },

  listaVazia: {
    marginTop: 20,
    textAlign: 'center',
  },
});