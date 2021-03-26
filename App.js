import React, { useState,useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import api from './src/services/api'

export default function App() {
  const [cep, setCep] = useState('');
  const [texto, setTexto] = useState(null);
  const [userCep, setUserCep] = useState(null);
  const inputText = useRef(null);


  async function enviar() {
    if (cep === '') {
      setTexto(true);
      setCep('');
      return;
    }
    try {
      //e para garantir que não vai ocorrer erro e caso aconteça vai enviar algo
      const response = await api.get(`/${cep}/json`);
      setUserCep(response.data);
      setTexto(null);

    } catch (error) {
      setTexto(error);
    }
  }


  function limpar() {
    setCep('');
    Keyboard.dismiss();
    inputText.current.focus();
    setUserCep(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*Aqui trata a entrada de dados do usuario*/}
      <View style={styles.entrada}>
        {texto && //sinfica que se tem algo renderiza
          <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
            Você digitou cep valido?
          </Text>
        }

        <Text style={styles.entradaTexto}>Busca Cep</Text>
        <TextInput
          style={styles.entradaDados}
          placeholder="ex:37811"
          keyboardType='numeric'
          value={cep}
          onChangeText={(item) => setCep(item)}
          ref={inputText}
        />

      </View>
      {/*Aqui trata os botões*/}
      <View style={styles.areaTotalBtn} >

        <TouchableOpacity
          style={[styles.areaBtn, { backgroundColor: "#DCDCDC" }]}
          onPress={enviar}
        >
          <Text style={styles.btTexto} >
            Buscar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.areaBtn, { backgroundColor: 'red', marginRight: -30 }]}
          onPress={limpar}
        >
          <Text style={styles.btTexto} >
            Limpar
          </Text>
        </TouchableOpacity>

      </View>
      {/*Aqui trata as saidas de informação*/}
      {userCep &&

        <View style={styles.saida} >

          <Text>CEP:{userCep.cep}</Text>
          <Text>LOGRADOURO:{userCep.logradouro}</Text>
          <Text>BAIRRO:{userCep.bairro}</Text>
          <Text>CIDADE:{userCep.localidade}</Text>
          <Text>ESTADO:{userCep.uf}</Text>

        </View>

      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  entrada: {
    flexDirection: 'column',
    marginBottom: 15,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entradaTexto: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  entradaDados: {
    backgroundColor: '#DCDCDC',
    borderRadius: 15,
    borderColor: "black",
    color: 'black',
    fontSize: 16,
    width: '90%',
    textAlign: 'center',
    padding: 10,
    alignItems: 'flex-end',
  },
  areaTotalBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 20,

  },
  areaBtn: {
    width: 90,
    height: 30,
    borderRadius: 5,

  },
  btTexto: {
    marginTop: 3,
    fontSize: 16,
    textAlign: 'center',
  },
  saida: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

});
