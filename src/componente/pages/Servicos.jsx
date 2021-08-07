// import React, {useState, useEffect, useRef} from 'react';
// import {View, Text} from 'react-native'
// import {styles} from '../styles/styles'
// import MapView from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import config from '../../../config/index.json'

// export default function Servicos(){
//     const [origem, setOrigem] = useState(null);
//     const [destino, setDestino] = useState(null);

//     useEffect(() => {
//         (async function(){
//             const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
//             if (status === 'granted') {
//                 let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
//                 setOrigem({
//                     latitude: location.coords.latitude,
//                     longitude: location.coords.longitude,
//                     latitudeDelta: 0.00922,
//                     longitudeDelta: 0.00421,
//                 })
//             } else {
//                 throw new Error('Location permission not granted');
//             }
//         })();
//     },[])


//     return(
//         <View style={styles.servicos}>

//             <MapView style={styles.map}
//                 initialRegion={{origem}}
//                 showsUserLocation={true}
//                 loadingEnabled={true}
//             >

//             </MapView>

//             <View style={styles.search}>
//             <GooglePlacesAutocomplete
//                     placeholder='Para onde vamos?'
//                     onPress={(data, details = null) => {
//                     // 'details' is provided when fetchDetails = true
//                         setDestino({
//                             latitude: details.geometry.location.lat
//                         })
//                         console.log(destino)
//                     }}
//                     query={{
//                         key: config.googleApi,
//                         language: 'pt-br',
//                     }}
//                     fetchDetails={true}
//                     styles={{listView:{height:100}}}
//     />
//             </View>
//         </View>
//     )
// }