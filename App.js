import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/componente/pages/Login';
import Principal from './src/componente/pages/Principal';
import { UserContext } from './src/componente/pages/UserContext';

export default function App() {
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const logar = async (user) => {
    setLogado(true);
    setUsuario(user);
  }

  const deslogar = async () => {
    setLogado(false);
    setUsuario(null);
  }

  return (
    <NavigationContainer >
      <StatusBar />
      <UserContext.Provider value={{ usuario, logar, deslogar }}>
      {logado ? <Principal /> : <Login />}
      </UserContext.Provider>
      {/* <Principal/> */}
    </NavigationContainer>
  );
}
