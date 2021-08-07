import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import UserView from './UserView';
import Servicos from './Servicos';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Principal() {
    return (
        <>
            <UserView />
            <Drawer.Navigator initialRouteName="">
                <Drawer.Screen/>
            </Drawer.Navigator>
            <Stack.Navigator>
                <Servicos/>
            </Stack.Navigator>
        </>
    );
}