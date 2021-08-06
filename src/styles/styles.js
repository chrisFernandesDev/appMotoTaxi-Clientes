import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    loginView: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black',
        justifyContent: 'center',
    },
    formView: {
        width: '80%',
        alignItems: 'center',
        marginTop: 70,
        justifyContent:'center'
    },
    h1: {
        fontSize: 30,
        color: 'white',
    },
    textHistorico:{
        fontSize: 30,
    },
    input: {
        fontSize: 16,
        padding: 5,
        margin: 5,
        backgroundColor:'white',
        width:'100%',
    },
    btn: {
        width:200,
    },
    cadastrar: {
        color: 'white',
    },
    msg: {
        color: 'red',
    }
})