import { Button } from "react-native/types";

function MetaInput(props) {
    const [inputMetaText, setInputMetaText] = useState('');

    function metaInuputHandler(inputText) {
        setInputMetaText(inputText);
    }

    function addMetaHandler(){
        props.onAddMeta(inputMetaText)
        setInputMetaText('');
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ width: '65%' }}>
                <TextInput
                    style={styles.inputText}
                    placeholder={rotulo_input_meta}
                    onChangeText={metaInuputHandler}
                />
            </View>

            <View style={{ width: '30%' }}>
                <Button title={rotulo_btn_cadastro_meta}
                    onPress={addMetaHandler} />
            </View>
        </View>
    );
}

export default MetaInput;


const styles = StyleSheet.create({
    inputText: {
        borderColor: '#cccccc',
        borderWidth: 1,
      },
})