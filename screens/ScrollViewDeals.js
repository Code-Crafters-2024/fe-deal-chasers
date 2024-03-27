import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ScrollViewDeals = ({ deals, region, children, setRegion }) => {
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  function handleScroll(value) {
    let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
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
        setRegion({
          latitude: location[0],
          longitude: location[1],
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: 0,
        });
      }
    }, 10);
  }
  //   useEffect(() => {
  //     mapAnimation.addListener(({ value }) => {
  //       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
  //       if (index >= deals.length) {
  //         index = deals.length - 1;
  //       }
  //       if (index <= 0) {
  //         index = 0;
  //       }
  //       clearTimeout(regionTimeout);
  //       const regionTimeout = setTimeout(() => {
  //         if (mapIndex !== index) {
  //           mapIndex = index;
  //           const { location } = deals[index];
  //           console.log(location);
  //           _map.current.animateToRegion(
  //             {
  //               latitude: location[0],
  //               longitude: location[1],
  //               latitudeDelta: region.latitudeDelta,
  //               longitudeDelta: region.longitudeDelta,
  //             },
  //             350
  //           );
  //         }
  //       }, 10);
  //     });
  //     return () => mapAnimation.removeAllListeners();
  //   });
  /////////////
  // {state.markers.map((marker, index) => {
  //     const scaleStyle = {
  //       transform: [
  //         {
  //           scale: interpolations[index].scale,
  //         },
  //       ],
  //     };
  //   const interpolations = deals.map((marker, index) => {
  //     const inputRange = [
  //       (index - 1) * CARD_WIDTH,
  //       index * CARD_WIDTH,
  //       (index + 1) * CARD_WIDTH,
  //     ];
  //     const scale = mapAnimation.interpolate({
  //       inputRange,
  //       outputRange: [1, 1.5, 1],
  //       extrapolate: "clamp",
  //     });
  //     return { scale };
  //   });
  //   onPress={(e) => onMarkerPress(e)}
  //   const onMarkerPress = (mapEventData) => {
  //     const markerID = mapEventData._targetInst.return.key;
  //     let x = markerID * CARD_WIDTH + markerID * 20;
  //     if (Platform.OS === "ios") {
  //       x = x - SPACING_FOR_CARD_INSET;
  //     }
  //     _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  //   };

  function formatDate(created_at) {
    return new Date(created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <View style={styles.container}>
      {children}
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        {deals.map((deal) => (
          <TouchableOpacity key={deal.deal_id} style={styles.chipsItem}>
            <Image source={{ uri: deal.image_url }} style={styles.dealsImage} />
            <Text>{deal.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
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
        onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.x)}
        // {Animated.event(
        //   [
        //     {
        //       nativeEvent: {
        //         contentOffset: {
        //           x: mapAnimation,
        //         },
        //       },
        //     },
        //   ],
        //   { useNativeDriver: true }
        // )}
      >
        {deals.map((item, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{ uri: item.image_url }}
              // style={styles.dealsImage} original deal card style
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              {/* <View style={styles.dealsInfo}> */}
              <Text style={styles.dealsTitle}>{item.title}</Text>
              <Text style={styles.dealsText}>Category: {"N/A"}</Text>
              <Text style={styles.dealsText}>
                Added: {formatDate(item.created_at)}
              </Text>
              <Text style={styles.dealsText}>Votes: {item.votes}</Text>
              <Text style={[styles.dealsText, styles.priceText]}>
                Price: £{item.price}
              </Text>
              {/* </View> */}
              {/* <View style={styles.shareContainer}>
                <Pressable onPress={onShare}>
                  <Icon name="share" size={24} color="#FF6347" />
                </Pressable>
              </View> */}
              {/*  */}
              <TouchableOpacity
                style={styles.getDealButton}
                onPress={() => handleGetDeal(item.link)}
              >
                <Text style={styles.getDealText}>Get Deal</Text>
              </TouchableOpacity>
              {/*  */}
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    Order Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ScrollViewDeals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // padding: 10,
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
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
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

  //

  container: {
    width: "95%",
    height: "95%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    //
    // paddingHorizontal: 20,
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
  //
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
