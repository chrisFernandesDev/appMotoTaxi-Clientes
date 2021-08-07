import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import UserView from './UserView';

const Stack = createStackNavigator();

export default function Principal() {
    return (
        <>
            <UserView />
            <Stack.Navigator initialRouteName="">

            </Stack.Navigator>
        </>
    );
}