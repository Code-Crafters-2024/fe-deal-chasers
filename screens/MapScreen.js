import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { getDeals } from "../utils/supabase";

import ScrollViewDeals from "./ScrollViewDeals";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [deals, setDeals] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapRef = React.useRef();
  const _scrollView = React.useRef();

  let mapAnimation = new Animated.Value(0);

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

  const interpolations = deals.map((deal, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });
    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key - 1;
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }
    const {location} = deals[markerID]
    mapRef.current.animateToRegion({
      latitude: location[0],
      longitude: location[1],
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: 0,
    }, 350);

    setSelectedMarker(markerID)

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  return region ? (
    <ScrollViewDeals
      deals={deals}
      region={region}
      setRegion={setRegion}
      mapRef={mapRef}
      selectedMarker={selectedMarker}
      setSelectedMarker={setSelectedMarker}
      _scrollView={_scrollView}
    >
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        showsUserLocation={true}
        tracksViewChanges={false}
        provider="google"
      >
        {deals.map((deal, index) => {
          const imageSource = selectedMarker === index ? require("../assets/map-marker-2.png") : require("../assets/map-marker-1.png")
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={deal.deal_id}
              coordinate={{
                latitude: deal.location[0],
                longitude: deal.location[1],
              }}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={imageSource}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
    </ScrollViewDeals>
  ) : (
    <Text>Loading...</Text>
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
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
});

export default MapScreen;
