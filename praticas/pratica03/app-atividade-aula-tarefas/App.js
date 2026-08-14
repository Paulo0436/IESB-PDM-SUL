import { StyleSheet, Text, TextInput, View  , Button} from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta , rotulo_lista_metas } from './mensagem';

export default function App() {
  return (
    <View style={styles.mainConteiner}>
      <TextInput placeholder={rotulo_input_meta}/>
      <Button title={rotulo_btn_cadastro_meta}/>
      <Text>{rotulo_lista_metas}</Text>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainConteiner:{
    padding: 30 , 

  }
});
