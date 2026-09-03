import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';

export default function MetaList({
  metas,
  onDelete,
  onToggleConcluida,
}) {
  function renderMeta({ item }) {
    return (
      <View style={styles.item}>
        <Pressable
          style={({ pressed }) => [
            styles.areaTexto,
            pressed && styles.areaPressionada,
          ]}
          onPress={() => onToggleConcluida(item.id)}
          android_ripple={{ color: '#dddddd' }}
        >
          <Text
            style={[
              styles.textoMeta,
              item.concluida && styles.metaConcluida,
            ]}
          >
            {item.texto}
          </Text>

          <Text style={styles.data}>
            Criada em: {formatarData(item.criadaEm)}
          </Text>

          <Text style={styles.status}>
            {item.concluida ? 'Concluída' : 'Pendente'}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botaoExcluir,
            pressed && styles.botaoExcluirPressionado,
          ]}
          onPress={() => onDelete(item.id)}
          android_ripple={{ color: '#ffffff55' }}
        >
          <Text style={styles.textoExcluir}>Excluir</Text>
        </Pressable>
      </View>
    );
  }

  function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={renderMeta}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.listaVazia}>
          Nenhuma meta cadastrada.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 12,
    padding: 15,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  areaTexto: {
    flex: 1,
    paddingRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },

  areaPressionada: {
    opacity: 0.7,
  },

  textoMeta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  metaConcluida: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  data: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },

  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  botaoExcluir: {
    backgroundColor: '#c62828',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },

  botaoExcluirPressionado: {
    opacity: 0.6,
  },

  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
  },

  listaVazia: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666',
    fontSize: 16,
  },
});