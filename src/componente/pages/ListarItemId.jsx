//Dados da corrida que serão mostrados ao usuário
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import firebase from '../../../firebase';


export default function ListarItemId(){
    const [state, setState] = useState([]);
    const [listCorridas, setListCorridas] = useState([]);

    useEffect(
            () => {pegaDados()}
        ), []
    

    
    const pegaDados = async () => {
        const corridas = firebase.db.collection('corrida');
        const querySnapshot = await corridas.where('motoristaId', '==', 'ColocarUIDaqui');
        const dados = querySnapshot.docs;
        const listCorridas = [];
        dados.forEach(
        doc => {
            listCorridas.push({
                ...doc.data(),
                key: doc.id
            })
        })    
        setState(listCorridas);
      }

      return(
        <FlatList
        data={state}
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
      )


}
