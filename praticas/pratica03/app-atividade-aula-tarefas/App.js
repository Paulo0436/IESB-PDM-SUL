import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta, rotulo_lista_metas } from './mensagem';
import { useState } from 'react';
import MetasList from './components/metasList';
import MetaInput from './components/MetaInput';

export default function App() {
  const [metas, setMetas] = useState([]);





  function adicionarMetaHandler() {
    setMetas([...metas, inputMetaText]);
  }


  return (
    <View style={styles.mainContainer}>
        <MetaInput onAddMeta = {adicionarMetaHandler}/>
      <View style={styles.metaContainer}>
        <MetasList array={metas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  },


  metaContainer: {
    flex: 15,
  },


});