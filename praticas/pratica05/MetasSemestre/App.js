import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const CHAVE_STORAGE = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    carregarMetas();
  }, []);

  useEffect(() => {
    salvarMetas();
  }, [metas]);

  async function carregarMetas() {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_STORAGE);

      if (dados !== null) {
        const metasSalvas = JSON.parse(dados);
        setMetas(metasSalvas);
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar suas metas.'
      );
    }
  }

  async function salvarMetas() {
    try {
      const dados = JSON.stringify(metas);

      await AsyncStorage.setItem(
        CHAVE_STORAGE,
        dados
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível salvar suas metas.'
      );
    }
  }

  function adicionarMeta() {
    if (!texto.trim()) {
      Alert.alert(
        'Atenção',
        'Digite uma meta antes de adicionar.'
      );

      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((metasAtuais) => [
      ...metasAtuais,
      novaMeta,
    ]);

    setTexto('');
  }

  function removerMeta(id) {
    setMetas((metasAtuais) =>
      metasAtuais.filter((meta) => meta.id !== id)
    );
  }

  function alternarConclusao(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id
          ? {
            ...meta,
            concluida: !meta.concluida,
          }
          : meta
      )
    );
  }

  const metasPendentes = metas.filter(
    (meta) => !meta.concluida
  ).length;

  const metasConcluidas = metas.filter(
    (meta) => meta.concluida
  ).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.cabecalho}>
          <Image
            source={require('./assets/favicon.png')}
            style={styles.logo}
          />

          <View>
            <Text style={styles.titulo}>
              Metas do Semestre
            </Text>

            <Text style={styles.contador}>
              {metasPendentes} pendentes / {metasConcluidas}{' '}
              concluídas
            </Text>
          </View>
        </View>

        <MetaInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarMeta}
        />

        <Text style={styles.tituloLista}>
          Minhas metas
        </Text>

        <MetaList
          metas={metas}
          onDelete={removerMeta}
          onToggleConcluida={alternarConclusao}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 10,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  contador: {
    marginTop: 5,
    color: '#666',
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});