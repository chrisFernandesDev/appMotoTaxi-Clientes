import React from 'react';
import {View, Text, FlatList} from 'react-native';
import { styles } from '../styles/styles';


export default function Historico(){


    return(
        <View>
            <Text style={styles.textHistorico}>Historico de corridas</Text>

            <FlatList/>

        </View>
    )
}