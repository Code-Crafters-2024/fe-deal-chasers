import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getDeals } from "../utils/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewMarkerIcon from "./NewMarkerIcon";
import ScrollViewDeals from "./ScrollViewDeals";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0,
  });
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
          return Promise.reject("Permission to access location was denied");
        }
        return Location.getCurrentPositionAsync({});
      })
      .then((location) => {
        setLocation(location);
        return getDeals();
      })
      .then((dealsData) => {
        setDeals(dealsData);
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  }, []);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0,
      });
    }
  }, [location]);

  return (
    <ScrollViewDeals deals={deals} region={region} setRegion={setRegion}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        showsUserLocation={true}
        tracksViewChanges={false}
        provider="google"
      >
        {deals.map((deal) => {
          return (
            <Marker
              key={deal.deal_id}
              coordinate={{
                latitude: deal.location[0],
                longitude: deal.location[1],
              }}
              title={deal.title}
              description={deal.body}
            >
              {/* <NewMarkerIcon deal={deal} /> */}
            </Marker>
          );
        })}
      </MapView>
    </ScrollViewDeals>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "95%",
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
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
