import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { getDeals } from "../utils/supabase";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0
  })
  const [deals, setDeals] = useState([])

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(({status})=>{
        if (status !== "granted") {
            return Promise.reject("Permission to access location was denied");
        }
        return Location.getCurrentPositionAsync({});
    }).then((location)=>{
        setLocation(location);
        return getDeals()
    }).then((dealsData)=>{
        setDeals(dealsData)
    })
    .catch((err)=>{setErrorMsg(err)})
  }, []);

  useEffect(()=>{
    if(location){
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0
        })
    }
  }, [location])

  function handleZoom(plus){
    if(plus){
        return setRegion((currRegion)=>{
            return {...currRegion, latitudeDelta: currRegion.latitudeDelta-0.01, longitudeDelta: 0}
        })
    } else {
        return setRegion((currRegion)=>{
            return {...currRegion, latitudeDelta: currRegion.latitudeDelta+0.01, longitudeDelta: 0}
        })
    }
  }

  return (
    <View>
    <MapView
      style={styles.map}
      region={region}
      onRegionChangeComplete={(region)=>setRegion(region)}
      showsUserLocation={true}
      tracksViewChanges={false}
      provider="google"
    >
        {deals.map((deal)=>{
            return <Marker key={deal.deal_id} coordinate={{latitude: deal.location[0], longitude: deal.location[1]}} title={deal.title} description={deal.body}></Marker>
        })}
    </MapView>
        <View style={styles.zoomContainer}>
            <Pressable style={styles.zoomButtons} onPress={()=>handleZoom(true)}><MaterialCommunityIcons name={'plus-thick'} size={20}/></Pressable>
            <Pressable style={styles.zoomButtons} onPress={()=>handleZoom(false)}><MaterialCommunityIcons name={'minus-thick'} size={20}/></Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: '95%',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    width: '100%',
    height: '100%'
  },
  zoomButtons: {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    borderColor: 'rgb(86,86,86)',
    borderWidth: '1px',
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    margin: 1
  },
  zoomContainer: {
    position: "absolute", 
    bottom: 40,
    right: 40
  }
});

export default MapScreen;
