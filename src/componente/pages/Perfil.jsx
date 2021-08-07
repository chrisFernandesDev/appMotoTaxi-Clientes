import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import {styles} from '../styles/style'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Perfil() {
  return (
  
    <View>

      <Text style={styles.perfil1} > Meu Perfil </Text>

      <View>
        <Image style={styles.perfilImg} source={require('../../../image/user.jpg')}/>
      </View>

      <View>
        <Text style={styles.perfil2}>{`Nome \n Roberto José`}</Text>
      </View>

      
      <View>
        <Text style={styles.perfil2}>{`Sobrenome \n Oliveira`}</Text>
      </View>

      <View>
        <Text style={styles.perfil2}>{`Telefone \n 11-99558-5489`}</Text>
      </View>

      <View style={styles.perfil2}>
      <Icon name="envelope" size={30}/>
      <Text style={styles.perfil3}>{`    rjoseoliveira@gmail.com`}</Text>
      </View>

      <View style={styles.perfilbtn}>
        <TouchableOpacity style={styles.perfilTouch}>
        <Text style={styles.perfilText}>Editar dados</Text></TouchableOpacity>                 
      </View>

    </View>


  );
}
