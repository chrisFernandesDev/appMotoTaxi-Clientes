import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/componente/pages/Login';
import Principal from './src/componente/pages/Principal';
import { UserContext } from './src/componente/pages/UserContext';
import firebase from './firebase';

export default function App() {
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const logar = async (user) => {
    setLogado(true);
    setUsuario(user);
  }

  const logout = async () => {
    const auth = firebase.auth;
    await auth.signOut();
    deslogar();
  };

  const deslogar = async () => {
    setLogado(false);
    setUsuario(null);
  }

  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      <UserContext.Provider value={{ usuario, logar, deslogar, logout }}>
      {logado && usuario ? <Principal /> : <Login />}
      </UserContext.Provider>
      {/* <Principal/> */}
    </NavigationContainer>
  );
}
