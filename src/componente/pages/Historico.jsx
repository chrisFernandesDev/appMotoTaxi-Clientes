import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '../styles/style';
import firebase from '../../../firebase';

export default function Historico() {
    const [loading, setLoading] = useState(true)
    const [stateMoto, setStateMoto] = useState([]);
    const [stateUser, setStateUser] = useState([]);
    const [listCorridas, setListCorridas] = useState([]);
    const [listUsers, setListUsers] = useState([]);

    useEffect(
        () => { pegaDadosConcluidas() }
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
    if (loading) {
        <ActivityIndicator />
    }

    ///// PegaDadosUsuarios > atributos que irão para o usuario
    const pegaDadosConcluidas = async () => {
        const users = firebase.db.collection('corrida');
        const querySnapshot = await users.where('status', '==', 'Finalizada').get();
        const dados = querySnapshot.docs;
        const listCorridas = [];
        dados.forEach(
            doc => {
                listCorridas.push({
                    ...doc.data(),
                    key: doc.id
                })
            })
        setStateUser(listCorridas);
    }
    return (

        <View style={styles.containerHist}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.cardTitulo}>Minhas Corridas</Text>
                </View>
                <Text style={styles.textconcl}>Concluidas</Text>
                <FlatList
                    data={stateUser}
                    renderItem={({ item }) => (
                        <View style={styles.containerCard}>
                            <View style={styles.cardHist}>
                                {/* <Text>Chave da corrida: {item.key}</Text> */}
                                <Text style={styles.textCardHist}>Origem: {item.origem}</Text>
                                <Text style={styles.textCardHist}>Destino: {item.destino}</Text>
                                <Text style={styles.textCardHist}>Passageiro: {item.passageiro}</Text>
                                <Text style={styles.textCardHist}>Status: {item.status}</Text>
                            </View>
                        </View>

                    )}
                />
        </View>
    )
}