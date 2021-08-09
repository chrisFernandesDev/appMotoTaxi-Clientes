import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        margin:10,
    },
    loginView: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formView: {
        width: '80%',
        alignItems: 'center',
        marginTop: 70,
        justifyContent:'center'
    },
    h1: {
        fontSize: 30,
        color:'black',
    },
    input: {
        fontSize: 16,
        padding: 5,
        marginVertical: 10,
        width:'100%',
        borderWidth:1,
        borderRadius:10,
    },
    btn: {
        backgroundColor:'yellow',
        width:170,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginVertical:20,
    },
    textbtn:{
        fontSize:20
    },
    cadastrar: {
        color: 'white',
    },
    msg: {
        color: 'red',
    },
    // Servicos
    servicos:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
    },
    map:{
        height: '40%',
        backgroundColor:'black'
    },
    search:{
        height: '60%',
        backgroundColor:'gray',
    },

    
    distance:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        padding: 10
    },
    distance__text:{
        fontSize:20,
        fontWeight:'bold'
    },
    price:{
        backgroundColor: '#000',
        padding: 7,
        borderRadius:4,
        marginTop:30,
        justifyContent:'center',
        alignItems: 'center'
    },
    price__text:{
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
})