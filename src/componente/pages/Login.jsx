import React, { useState } from 'react';
import firebase from '../../../firebase';
import { Text, View, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useContext } from 'react'
import { UserContext } from './userContext';
import { Ionicons } from '@expo/vector-icons'

export default function Login() {
    const { logar, deslogar } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState(false);
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        cpf: '',
        idade: '',
        endereco: '',
        telefone: '',
    })
    const [state, setState] = useState({
        senha: "",
        msg: "",
    });

    const addUser = async () => {
		await firebase.db
			.collection('users')
			.add(dados)
			.then(() => {
				alert('Usuário adicionado');
			})
			.catch((error) => alert(error));
	};

    const handleInputChangeState = (name, value) => {
        setState({
            ...state,
            [name]: value
        });
    };

    const handleInputChangeDados = (name, value) => {
        setDados({
            ...dados,
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
        const { email } = dados;
        const { senha } = state;
        try {
            const resposta = await auth.signInWithEmailAndPassword(email, senha)
            setState({ ...state, msg: "Loguei" })
            setDados({ ...dados})
        } catch (error) {
            setState({ ...state, msg: "Email ou Senha invalidos" })
            setDados({ ...dados})
        }
    }


    const cadastrar = async () => {
        const auth = firebase.auth;
        const { email } = dados;
        console.log(email)
        const { senha } = state;
        console.log(senha)
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

                <Text>{newUser ?
                <View>
                    <TextInput
                        placeholder="Nome"  
                        onChangeText={(value) => handleInputChangeDados('nome', value)} 
                    />
                     <TextInput
                        placeholder="Email"
                        onChangeText={(value) => handleInputChangeDados('email', value)}
                    />
                    <TextInput
                        placeholder="Idade"
                        onChangeText={(value) => handleInputChangeDados('idade', value)}
                    />
                    <TextInput
                        placeholder="Cpf"
                        onChangeText={(value) => handleInputChangeDados('cpf', value)}
                    />
                    <TextInput
                        placeholder="Endereço"
                        onChangeText={(value) => handleInputChangeDados('endereco', value)}
                    />
                    <TextInput
                        placeholder="Telefone"
                        onChangeText={(value) => handleInputChangeDados('telefone', value)}
                    />
                    <TextInput
                        placeholder="Senha"
                        onChangeText={(value) => handleInputChangeState('senha', value)}
                    />
                    </View>
                    :
                    <View>
                    <TextInput
                        placeholder="Email"
                        onChangeText={(value) => handleInputChangeDados('email', value)}
                    />
                    <TextInput
                        placeholder="Senha"
                        onChangeText={(value) => handleInputChangeState('senha', value)}
                        secureTextEntry={hidePass}
                    />
                    </View>
}
                    </Text>

                {newUser ?
                    <Button title="Cadastrar"
                        onPress={()=> {cadastrar(); addUser()}}
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