import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TextInput, Pressable } from 'react-native';
import styles from './styles';

export default function Home() {
  const [id, setID] = useState('');
  const [filmeG, setFilmeG] = useState('');
  const [generoG, setGeneroG] = useState('');
  const [anoG, setAnoG] = useState('');
  const [classifG, setClassificG] = useState('');
  const [idiomaG, setIdiomaG] = useState('');
  const [filme, setFilme] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [classif, setClassif] = useState('');
  const [idioma, setIdioma] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (token != null) {
          setToken(value);
          console.log('Token Home: ', value);
        }
      })
      .catch((error) => {
        console.error('Erro ao recuperar o Token', error);
      });
  }, []);

  const capturar = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/filme/' + id,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      setFilmeG(response.data.titulo);
      setGeneroG(response.data.genre.genre);
      setAnoG(response.data.ano);
      setClassificG(response.data.classific);
      setIdiomaG(response.data.idioma);
    } catch (error) {
      console.log('Erro ao capturar o filme:', error);
    }
  };

  const enviar = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/listafilmes',
        {
          titulo: filme,
          genero: genero,
          ano: ano,
          classific: classif,
          idioma: idioma
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
       
      );
      console.log('Dados inseridos com sucesso');
      setFilme('')
      setGenero('')
      setAno('')
      setClassif('')
      setIdioma('')

    } catch (error) {
      console.log('Erro ao inserir os dados:', error);
    }
  };

  const atualizar = async () => {
    try {
      const response = await axios.put(
        'http://127.0.0.1:8000/api/filme/' + id,
        {
          titulo: filmeG,
          genero: generoG,
          ano: anoG,
          classific: classifG,
          idioma: idiomaG
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Alterado com sucesso!');
    } catch (error) {
      console.log('Erro ao atualizar:', error);
    }
  };

  const deletar = async () => {
    try {
      const response = await axios.delete(
        'http://127.0.0.1:8000/api/filme/' + id,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Filme deletado com sucesso!');
      setFilme('')
      setGenero('')
      setAno('')
      setClassif('')
      setIdioma('')
    } catch (error) {
      console.log('Erro ao deletar o filme:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stGet}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text>ID:</Text>
          <TextInput
            value={id}
            onChangeText={(e) => { setID(e); }}
            style={styles.caixaID}
          />
          <Pressable
            style={styles.btn}
            onPress={capturar}
          >
            <Text style={{ fontWeight: 'bold' }}>GET</Text>
          </Pressable>

          <Pressable
            style={styles.btn}
            onPress={atualizar}
          >
            <Text style={{ fontWeight: 'bold' }}>PUT</Text>
          </Pressable>

          <Pressable
            style={styles.btn}
            onPress={deletar}
          >
            <Text style={{ fontWeight: 'bold' }}>DELETE</Text>
          </Pressable>
        </View>
        <Text>Filme</Text>
        <TextInput
          value={filmeG}
          style={styles.caixaGet}
          onChangeText={(e) => setFilmeG(e)}
        />
        <Text>Gênero</Text>
        <TextInput
          value={generoG}
          style={styles.caixaGet}
          onChangeText={(e) => setGeneroG(e)}
        />
        <Text>Ano</Text>
        <TextInput
          value={anoG}
          style={styles.caixaGet}
          onChangeText={(e) => setAnoG(e)}
        />
        <Text>Idioma</Text>
        <TextInput
          value={idiomaG}
          style={styles.caixaGet}
          onChangeText={(e) => setIdiomaG(e)}
        />
        <Text>Classificação</Text>
        <TextInput
          value={classifG}
          style={styles.caixaGet}
          onChangeText={(e) => setClassificG(e)}
        />
      </View>

      <View style={styles.stPost}>
        <Pressable
          style={styles.btn}
          onPress={enviar}
        >
          <Text style={{ fontWeight: 'bold' }}>POST</Text>
        </Pressable>
        <Text>Filme</Text>
        <TextInput
          value={filme}
          onChangeText={(e) => { setFilme(e); }}
          style={styles.caixaPost}
        />
        <Text>Gênero</Text>
        <TextInput
          value={genero}
          onChangeText={(e) => { setGenero(e); }}
          style={styles.caixaPost}
        />
        <Text>Ano</Text>
        <TextInput
          value={ano}
          onChangeText={(e) => { setAno(e); }}
          style={styles.caixaPost}
        />
        <Text>Idioma</Text>
        <TextInput
          value={idioma}
          onChangeText={(e) => { setIdioma(e); }}
          style={styles.caixaPost}
        />
        <Text>Classificação</Text>
        <TextInput
          value={classif}
          onChangeText={(e) => { setClassif(e); }}
          style={styles.caixaPost}
        />
      </View>
    </View>
  );
}
