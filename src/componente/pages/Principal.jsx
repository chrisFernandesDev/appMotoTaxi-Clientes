import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import UserView from './UserView';
import Viagens from './Viagens';
import Historico from './Historico';
import Perfil from './Perfil';
import ListarItem from './ListarItem'
import Mapa from './Mapa';
import { DrawerContent } from './DrawerContent';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Principal() {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Mapa">
            <Drawer.Screen name='Home' component={Mapa} />
            <Drawer.Screen name='Historico' component={Historico} />
            <Drawer.Screen name='Perfil' component={Perfil} />
            <Drawer.Screen name='Logout' component={UserView} />
        </Drawer.Navigator>
    );
}