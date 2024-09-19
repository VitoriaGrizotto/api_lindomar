import React, {useState, useEffect } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import axios from "axios";

export default function Login({navigation}){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const[mensagem, setMensagem] = useState('')

    useEffect(()=>{
      AsyncStorage.setItem('token',token)
        .then(
          ()=>{
            if (token != null){
                 console.log('Token login: ', token)
            }
          }
        )
        .catch(
          (error)=>{
            console.error('Erro ao salvar o Token', error)
          }
        )
    },[token])

    const logar = async ()=>{
        try{
          const response = await axios.post(
            'http://127.0.0.1:8000/api/token/', {
                username: user,
                password: password
            }
          )
          console.log(response.data.access)
          setToken(response.data.access)
          navigation.navigate('Home')
        }
        catch(error){
          console.error(error)
        }
    }


    return (
        <View style={styles.container}>
            <View>
                <Text>Username</Text>
                <TextInput
                    style ={styles.caixa}
                    value={user}
                    onChangeText={(e) => setUser(e)}
                    placeholder="User"
                />
            </View>
            <View>
                <Text>Password</Text>
                <TextInput
                    style ={styles.caixa}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry={true}
                    placeholder="PassWord"
                />
               
            </View>
            <View>
                <Pressable style={styles.btn} onPress={logar}>
                    <Text style={{ fontWeight: "bold" }}>LOGAR</Text>
                </Pressable>
            </View>
        </View>
    )
}