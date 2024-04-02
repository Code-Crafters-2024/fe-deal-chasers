import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import DealsListCard from "../Components/DealsListCard";
import { getCategories, getDeals } from "../utils/supabase";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function ScrollViewDeals() {
  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [deals, setDeals] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const scrollRef = React.useRef();
  const mapRef = React.useRef();

  let mapIndex = 0;
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
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  }, []);

  useEffect(() => {
    const promises = [getDeals(selectedCategory), getCategories()];
    Promise.all(promises).then((data) => {
      const dealsData = data[0];
      const categoriesData = data[1];
      setDeals(dealsData);

      if (selectedCategory) {
        setCategories(
          categoriesData.filter((category) => {
            return category.category_id === selectedCategory;
          })
        );
      } else {
        setCategories(categoriesData);
      }
    });
  }, [selectedCategory]);

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

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= deals.length) {
        index = deals.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { location } = deals[index];
          setSelectedMarker(deals[index].deal_id);
          mapRef.current.animateToRegion(
            {
              latitude: location[0],
              longitude: location[1],
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: 0,
            },
            350
          );
        }
      }, 10);
    });
    return () => mapAnimation.removeAllListeners();
  });

  const onMarkerPress = (mapEventData) => {
    const dealID = mapEventData._targetInst.return.key;
    const markerID = mapEventData._targetInst.return.index;
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }
    setSelectedMarker(+dealID);

    scrollRef.current.scrollTo({ x: x, y: 0, animated: true });
  };

  function handleCategorySelection(category_id) {
    if (selectedCategory === category_id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category_id);
    }
  }

  return region ? (
    <View style={styles.container}>
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
          const imageSource =
            selectedMarker === deal.deal_id
              ? require("../assets/map-marker-2.png")
              : require("../assets/map-marker-1.png");
          return (
            <Marker
              key={deal.deal_id}
              coordinate={{
                latitude: deal.location[0],
                longitude: deal.location[1],
              }}
              onPress={(e) => onMarkerPress(e)}
              title={deal.title}
            >
              <Animated.View style={styles.markerWrap}>
                <Animated.Image
                  source={imageSource}
                  style={styles.marker}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        {categories.map((category) => {
          const selectedStyle =
            category.category_id === selectedCategory
              ? { backgroundColor: "black" }
              : {};
          const textStyle =
            category.category_id === selectedCategory ? { color: "white" } : {};

          return (
            <TouchableOpacity
              key={category.category_id}
              style={[styles.chipsItem, selectedStyle]}
              onPress={() => handleCategorySelection(category.category_id)}
            >
              <Text style={textStyle}>{category.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {deals.map((item, index) => (
          <DealsListCard
            item={item}
            index={index}
            key={item.deal_id}
            categories={categories}
          />
        ))}
      </Animated.ScrollView>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}

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
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    width: "95%",
    height: "95%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  /* CATEGORY CARD CSS */

  dealsList: {
    flexGrow: 1,
  },

  /* DEALS CARD CSS */
  dealsContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dealsCard: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    minHeight: 120,
  },
  dealsImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    marginLeft: 5,
  },
  priceText: {
    color: "#FF6347",
    fontSize: 13,
    fontWeight: "bold",
  },
  dealsInfo: {
    flex: 1,
  },
  dealsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  dealsText: {
    fontSize: 12,
    marginBottom: 2,
  },
  shareContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  dealsShareImage: {
    width: 30,
    height: 30,
  },
  getDealButton: {
    position: "absolute",
    bottom: 15,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#FF6347",
  },
  getDealText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  //new styles added
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});
