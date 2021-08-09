import React, { useState, useRef } from 'react';
import firebase from '../../../firebase';
import { Text, View, TextInput, ActivityIndicator, TouchableOpacity, Button, ScrollView } from 'react-native';
import { useEffect, useContext } from 'react'
import { UserContext } from './UserContext';
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../styles/style';
import { TextInputMask } from 'react-native-masked-text';

export default function Login() {
    const { logar, deslogar } = useContext(UserContext);
    const cpfRef = useRef(null);
    const cellRef = useRef(null);

    function showCpf() {
        const unmaskCpf = cpfRef?.current.getRawValue();
        const cpfIsValid = cpfRef?.current.isValid();
        alert(cpfIsValid)
    }

    function showCell() {
        const unmask = cellRef?.current.getRawValue();
        alert(unmask)
    }

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

    const addUser = async (param) => {
        await firebase.db
            .collection('users')
            .doc(param)
            .set(dados)
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
            setDados({ ...dados })
        } catch (error) {
            setState({ ...state, msg: "Email ou Senha invalidos" })
            setDados({ ...dados })
        }
    }

    const cadastrar = async () => {
        const auth = firebase.auth;
        const { email } = dados;
        const { senha } = state;
        if (senha.length >= 6) {
            try {
                const resposta = await auth.createUserWithEmailAndPassword(email, senha);
                auth.currentUser.sendEmailVerification();
                addUser(auth.currentUser.uid)
                setNewUser(false);
                setState({ ...state, msg: "verifique sua conta de email" })
            } catch (error) {
                setState({ ...state, msg: "Não foi possível cadastrar o usuário" })
            }
        } else {
            setState({ ...state, msg: "Senha deve conter no mínimo 6 caracteres" })
        }

        setState({
            senha: "",
            msg: "",
        })

        setDados({
            nome: '',
            email: '',
            cpf: '',
            idade: '',
            endereco: '',
            telefone: '',
        })
    }

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.loginText}>{newUser ? "Novo Usuário" : ""}</Text>


                {newUser ? <View style={styles.formView}>
                    <TextInput
                        style={styles.loginInput}
                        placeholder="Nome"
                        onChangeText={(value) => handleInputChangeDados('nome', value)}
                        value={dados.nome}
                    />

                    <TextInput
                        style={styles.loginInput}
                        placeholder="Email"
                        onChangeText={(value) => handleInputChangeDados('email', value)}
                        value={dados.email}
                    />
                    <TextInput
                        style={styles.loginInput}
                        placeholder="Idade"
                        onChangeText={(value) => handleInputChangeDados('idade', value)}
                        value={dados.idade}
                    />
                    <TextInputMask
                        style={styles.loginInput}
                        placeholder={'CPF'}
                        type={'cpf'}
                        value={dados.cpf}
                        onChangeText={(value) => handleInputChangeDados('cpf', value)}
                        defaultValue={dados.cpf}
                        ref={cpfRef}
                    />

                    {/* <Button title='show'
                    onPress={showCpf}/> */}

                    <TextInput
                        style={styles.loginInput}
                        placeholder="Endereço"
                        onChangeText={(value) => handleInputChangeDados('endereco', value)}
                        value={dados.endereco}
                    />
                    <TextInputMask
                        style={styles.loginInput}
                        placeholder={'Telefone'}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) ',
                        }}
                        value={dados.telefone}
                        onChangeText={(value) => handleInputChangeDados('telefone', value)}
                        // defaultValue={null}
                        ref={cellRef}
                    />

                    {/* <Button title='show'
                    onPress={showCell}/> */}

                    <TextInput
                        style={styles.loginInput}
                        placeholder="Senha"
                        onChangeText={(value) => handleInputChangeState('senha', value)}
                        value={state.senha}
                    />
                </View>
                    :
                    <View style={styles.formView1}>
                        <TextInput
                            style={styles.loginInput}
                            placeholder="Email"
                            onChangeText={(value) => handleInputChangeDados('email', value)}
                            value={dados.email}
                        />
                        <TextInput
                            style={styles.loginInput}
                            placeholder="Senha"
                            onChangeText={(value) => handleInputChangeState('senha', value)}
                            value={state.senha}
                        // secureTextEntry={true}
                        />
                    </View>
                }

                <View style={styles.divbtn}>
                    {newUser ?
                        <TouchableOpacity
                            onPress={cadastrar}
                            style={styles.loginTouch}
                        ><Text
                            style={styles.loginText1}
                        >Cadastrar</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={login}
                            style={styles.loginTouch}
                        ><Text
                            style={styles.loginText1}
                        >Login</Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={styles.cadastrar}>{newUser ? <Text onPress={() => setNewUser(false)}>Login</Text> : <Text onPress={() => setNewUser(true)} >Cadastrar</Text>}
                    <Text >{state.msg}</Text>
                </View>
            </ScrollView>
        </View>
    )
}