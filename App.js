import React from 'react';
import { StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import Login from './src/componente/Login';
import { styles } from './src/styles/styles';


export default function App() {
  return (
      <View style={styles.container}>
        <StatusBar/>
        <Login/>
      </View>
  );
}