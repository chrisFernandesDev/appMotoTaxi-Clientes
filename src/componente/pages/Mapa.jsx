import React, { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../../../config";
import MapViewDirections from "react-native-maps-directions";
import { MaterialIcons } from "@expo/vector-icons";

export default function Mapa(props) {
  const mapEl = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    pegaLocation();
  }, []);
  const pegaLocation = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION_FOREGROUND
    );
    console.log("chegou aqui");
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      console.log(location);
    } else {
      throw new Error("Location permission not granted");
    }
  };
  return (
    <View style={styles.servicos}>
      <MapView
        style={styles.map}
        initialRegion={origin}
        showsUserLocation={true}
        loadingEnabled={true}
        ref={mapEl}
      >
        {destination && (
          <MapViewDirections
            lineDashPattern={[0]}
            origin={origin}
            destination={destination}
            apikey={config.googleApi}
            strokeWidth={3}
            strokeColor="black"
            onReady={(result) => {
              setDistance(result.distance);
              setPrice(result.distance * 3);
              mapEl.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  top: 50,
                  bottom: 50,
                  left: 50,
                  right: 50,
                },
              });
            }}
          />
        )}
      </MapView>

      <View style={styles.search}>
        <GooglePlacesAutocomplete
          placeholder="Para onde vamos ?"
          onPress={(data, details = null) => {
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          query={{
            key: config.googleApi,
            language: "pt-br",
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={{ listView: { height: 100 } }}
        />

        {distance && (
          <View style={styles.distance}>
            <Text style={styles.distance__text}>
              Distância: {distance.toFixed(2).replace(".", ",")}km
            </Text>
            <TouchableOpacity
              style={styles.price}
              onPress={() =>
                props.navigation.navigate("Checkout", {
                  price: price.toFixed(2),
                })
              }
            >
              <Text style={styles.price__text}>
                <MaterialIcons name="payment" size={24} color="white" /> Pagar
                R${price.toFixed(2).replace(".", ",")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
