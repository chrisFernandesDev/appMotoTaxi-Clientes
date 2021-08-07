import React, { useContext, useState } from 'react';
import { Button, Text, View } from 'react-native';
import firebase from '../../../firebase';
import { UserContext } from './UserContext';

export default function UserView() {
    const { usuario, deslogar } = useContext(UserContext);
    const [userView, setUserView] = useState(false);

    const logout = async () => {
        const auth = firebase.auth;
        await auth.signOut();
        deslogar();
    }

    if (userView) {
        return (
            <View>
                <Text>Usuario {usuario.email} Logado</Text>
                <Button title="Logout" onPress={logout} />
                <Text onPress={() => setUserView(false)}>Ocultar</Text>
            </View>
        )
    } else{
        return(
            <View>
                <Text onPress={()=> setUserView(true)}>Usuário</Text>
            </View>
        )
    }

}