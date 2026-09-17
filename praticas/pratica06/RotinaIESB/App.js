import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  tituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
} from './labels';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const CHAVE_STORAGE = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);

  useEffect(() => {
    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (compromissos.length > 0) {
      salvarCompromissos();
    }
  }, [compromissos]);

  async function carregarCompromissos() {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_STORAGE);

      if (dados !== null) {
        const compromissosSalvos = JSON.parse(dados);
        setCompromissos(compromissosSalvos);
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar os compromissos.'
      );
    }
  }

  async function salvarCompromissos() {
    try {
      const dados = JSON.stringify(compromissos);

      await AsyncStorage.setItem(
        CHAVE_STORAGE,
        dados
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível salvar os compromissos.'
      );
    }
  }

  function adicionarCompromisso() {
    if (!texto.trim()) {
      Alert.alert(
        'Atenção',
        'Digite um compromisso antes de adicionar.'
      );

      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    setCompromissos((listaAtual) => [
      ...listaAtual,
      novoCompromisso,
    ]);

    setTexto('');
  }

  function removerCompromisso(id) {
    setCompromissos((listaAtual) =>
      listaAtual.filter(
        (compromisso) => compromisso.id !== id
      )
    );
  }

  const pendentes = compromissos.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}> 
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
          />

          <View style={styles.headerTexto}>
            <Text style={styles.titulo}>
              {tituloApp}
            </Text>

            <Text style={styles.contador}>
              {pendentes} pendente{pendentes !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <View style={styles.formulario}>
          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarCompromisso}
            labels={{
              placeholderCompromisso,
              botaoAdicionar,
            }}
          />
        </View>

        <View style={styles.lista}>
          <CompromissoList
            itens={compromissos}
            onDelete={removerCompromisso}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
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

  headerTexto: {
    flex: 1,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  contador: {
    marginTop: 5,
    fontSize: 14,
  },

  formulario: {
    width: '100%',
  },

  lista: {
    flex: 1,
  },
}); 