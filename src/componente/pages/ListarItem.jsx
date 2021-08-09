//motorista / corporativa
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, TextInput, View } from 'react-native';
import firebase from '../../../firebase';


export default function ListarItem() {
    const [loading, setLoading] = useState(true)
    const [stateMoto, setStateMoto] = useState([]);
    const [stateUser, setStateUser] = useState([]);
    const [listCorridas, setListCorridas] = useState([]);
    const [listUsers, setListUsers] = useState([]);

    useEffect(
        () => { pegaDadosCorrida(), pegaDadosUsers() }
    ), []

    ///// PegaDadosCorrida > Atributos que irão para o motorista
    const pegaDadosCorrida = async () => {
        const motor = firebase.db.collection('corrida');
        const querySnapshot = await motor.get();
        const dados = querySnapshot.docs;
        const listCorridas = [];
        dados.forEach(
            doc => {
                listCorridas.push({
                    ...doc.data(),
                    key: doc.id
                })
            })
        setStateMoto(listCorridas);
        setLoading(false);
    }
    if(loading){
        <ActivityIndicator/>
    }

    ///// PegaDadosUsuarios > atributos que irão para o usuario
    const pegaDadosUsers = async () => {
        const users = firebase.db.collection('motorista');
        const querySnapshot = await users.get();
        const dados = querySnapshot.docs;
        const listCorridas = [];
        dados.forEach(
            doc => {
                listCorridas.push({
                    ...doc.data(),
                    key: doc.id
                })
            })
        setStateUser(listUsers);
    }
    return (
        <View>
            <FlatList
                data={stateMoto}
                renderItem={({ item }) => (
                    <View>
                        <Text>Chave da corrida: {item.key}</Text>
                        <Text>Origem: {item.origem}</Text>
                        <Text>Destino: {item.destino}</Text>
                        <Text>Passageiro: {item.passageiro}</Text>
                        <Text>Status: {item.status}</Text>
                        <Text> ----- </Text>
                    </View>
                )}
            />
        </View>
    )
}
