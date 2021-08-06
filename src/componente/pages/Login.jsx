import React, { useState } from 'react';
import firebase from '../../../firebase';
import { Text, View, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useContext } from 'react'
import { UserContext } from './UserContext';
import { Ionicons } from '@expo/vector-icons'

export default function Login() {
    const { logar, deslogar } = useContext(UserContext);

    // const [hidePass, setHidePass] = useState(true);
    // const [input, setInput] = useState('');

    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState(false);
    const [state, setState] = useState({
        nome: "",
        email: "",
        senha: "",
        msg: "",
    });

    const handleInputChange = (name, value) => {
        setState({
            ...state,
            [name]: value
        });
    };

    useEffect(
        () => {
            const auth = firebase.auth;
            const unsubscribed = auth.onAuthStateChanged(
                user => {
                    if (user) {
                        if (user.emailVerified) {
                            logar(user);
                        } else {
                            auth.signOut();
                            deslogar();
                            setLoading(false);
                        }
                    } else {
                        setLoading(false)
                    }
                }
            )
            return () => {
                unsubscribed();
            }
        }, []
    )

    const login = async () => {
        const auth = firebase.auth;
        const { email, senha } = state;
        try {
            const resposta = await auth.signInWithEmailAndPassword(email, senha)
            setState ({... state, msg: "Loguei"})
        } catch (error) {
            setState({ ...state, msg: "Email ou Senha invalidos" })
        }
    }


    const cadastrar = async () => {
        const auth = firebase.auth;
        const { email, senha } = state;
        if (senha.length >= 6) {
            try {
                const resposta = await auth.createUserWithEmailAndPassword(email, senha);
                // auth.currentUser.sendEmailVerification();
                setNewUser(false);
                setState({ ...state, msg: "verifique sua conta de email" })
            } catch (error) {
                setState({ ...state, msg: "Não foi possível cadastrar o usuário" })
            }
        } else {
            setState({ ...state, msg: "Senha deve conter no mínimo 6 caracteres" })
        }
    }
  
    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <View>
            <View>
                <Text>{newUser ? "Novo Usuário" : "Login"}</Text>
                <TextInput
                    placeholder="Nome"
                    defaultValue={state.nome}
                    onChangeText={(value) => handleInputChange('nome', value)}

                />

                <TextInput
                    placeholder="Email"
                    defaultValue={state.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />

                <TextInput
                    placeholder="Senha"
                    defaultValue={state.senha}
                    secureTextEntry={true}
                    onChangeText={
                        (value) =>
                            handleInputChange('senha', value)
                            // (texto) => setInput(true)
                    }
                    // secureTextEntry={hidePass}
                />
                {/* <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                    <Ionicons name="eye" color="black" size={25} />
                </TouchableOpacity> */}

                {newUser ?
                    <Button title="Cadastrar"
                        onPress={cadastrar}
                    />
                    :
                    <Button title="Login"
                        onPress={login}
                    />}

                {newUser ? <Text onPress={() => setNewUser(false)}> Login </Text> : <Text onPress={() => setNewUser(true)}>Cadastrar</Text>}

                <Text >{state.msg}</Text>

            </View>
        </View>
    )
}