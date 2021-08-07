import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import UserView from './UserView';
import Viagens from './Viagens';
import ListarItem from './ListarItem';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Principal({ navigation }) {
    return (
        <>
            <UserView />
            <ListarItem />

            {/* <Stack.Navigator initialRouteName="Viagens">
                <Stack.Screen name='Viagens' component={Viagens}/>
            </Stack.Navigator> */}
            {/* <Drawer.Navigator initialRouteName='Viagens'>
                <Drawer.Screen name='Viagens' component={Viagens}/>
            </Drawer.Navigator> */}
        </>
    );
}