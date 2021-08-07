import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { styles } from '../styles/style';


export default function Viagens({navigation}){
        
    return(
        <View style={styles.cotainer}>
            
            <View style={styles.servico}>
                <View style={styles.map}>
                    <Text>Mapa</Text>
                </View>

                <View style={styles.cardservico}>
                    <TextInput style={styles.inputservico}
                        placeholder='Pra onde vamos?'
                    />
                    <TextInput style={styles.inputservico}
                        placeholder='Onde estou?'
                    />
                    <TouchableOpacity style={styles.btnservico}
                    ><Text style={styles.opservico}
                    >Solicitar</Text></TouchableOpacity>
                </View>

                <View style={styles.infocardmoto}>
                    <View style={styles.cardinfomoto}>
                        <Text>Informação do motociclista:</Text>
                    </View>
                </View>

                <View style={styles.containercard}>
                    <View style={styles.cardstatus}>
                        <Text style={styles.textstatus}>Status</Text>
                    </View>
                    <View style={styles.cardstatus}>
                        <Text style={styles.textstatus}>Valor</Text>
                    </View>
                </View>
                
            </View>
        </View>
    )
}