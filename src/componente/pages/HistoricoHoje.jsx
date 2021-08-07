import React from "react";
import { Text, View, ImageBackground} from "react-native";
import { styles } from "../styles/style";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function AceitarCorrida() {
  return (

    <ImageBackground source={require('../../../image/foto.png')}>
    
    <View style={styles.container}>

      <View>

        <View>
          <Text>R$ 75,00</Text>
        </View>
     
        <Text>Saldo Hoje</Text>

        <Text>15 viagens concluídas</Text>
        <Text>Ver todas as Viagens</Text>
  
      </View>
     
    </View>

    <View>
          <View>
            <Icon name="angle-double-up"size={30}/>
          </View>
          <Text>Você está offiline </Text>
          <View>
            <Icon name="bars" size={30}/>
          </View>
        </View>

    </ImageBackground>   
  );
}
