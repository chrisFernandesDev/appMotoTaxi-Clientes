import React, { useState, useContext, useEffect } from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import { styles } from '../styles/style';
import { UserContext } from './UserContext';
import firebase from '../../../firebase';
// import Mapa from './Mapa';
export default function Viagens({navigation}) {
    const {usuario} = useContext(UserContext)

	const [ok, setOk] = useState(false)
	const [state, setState] = useState({
		origem:'',
        destino:''
	})

    console.log(usuario.uid)



	const handleInputChange = (name, value) => {
        setState({
            ...state, [name]: value
        })
    }

	const addCriarCorridas = async (param)=>{
		await firebase.db.collection("corrida").add({state, keyPassageiro: param.uid}).then(
			() =>{
				alert("Corrida Criada")
				setOk(true)
			}
		).catch(
			error => alert(error)
		)
	}

	// Pagina a ser definida para retorno após 
	// a corrida ter sido criada com sucesso
	
    return(
        <View style={styles.cotainer}>
            
            <View style={styles.servico}>

                <View style={styles.cardservico}>
                    <TextInput style={styles.inputservico}
                        placeholder='Pra onde vamos?'
                        onChangeText={(value)=> handleInputChange('destino',value)}
                    />
                    <TextInput style={styles.inputservico}
                        placeholder='Onde estou?'
                        onChangeText={(value)=> handleInputChange('origem',value)}
                    />
                    <TouchableOpacity style={styles.btnservico}
                    ><Text style={styles.opservico}
                        // onPress={() => navigation.navigate('Solicitacao')}
                        onPress={()=> addCriarCorridas(usuario)}
                    >Solicitar</Text></TouchableOpacity>
                </View>

                <Image style={styles.image}source={require('../../../image/foto.png')}/>

                <View style={styles.containercard}>
                    
                    <View style={styles.cardstatus}>
                        <Text style={styles.textstatus}>Status</Text>
                    </View>
                    <View style={styles.cardstatus}>
                        <Text style={styles.textstatus}>Valor</Text>
                    </View>

                </View>
                
                <View style={styles.infocardmoto}>

                    <View style={styles.cardinfomoto}>
                        <Text>Informação do motociclista:</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}