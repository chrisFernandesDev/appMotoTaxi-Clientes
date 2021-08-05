import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {styles} from '../styles/styles'


export default function Login(){
    
    
    return(
        <View style={styles.loginView}>

            <View style={styles.formView}>

                <Text style={styles.h1}
                >Login</Text>

                <TextInput style={styles.input}
                    placeholder='email'
                />

                <TextInput style={styles.input}
                    placeholder='senha'
                    secureTextEntry={true}
                />
                
                <View style={styles.btn}>
                    <Button title='Login'/>
                </View>

            </View>
        </View>
    )
}