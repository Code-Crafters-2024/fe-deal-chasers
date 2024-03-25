import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  Share,
} from "react-native";
import { styles } from "../styles";

const Deals = () => {
  const [deals, setDeals] = useState([]);

  /*dummy deals data */
  const dealsData = [
    {
      title: "Laptop",
      category: "Electronics",
      location: "place",
      image:
        "https://as1.ftcdn.net/v2/jpg/00/95/43/62/1000_F_95436240_BEyGcwpTvjh2JOKvIWm0zarklfVTpdDr.jpg",
      votes: "1",
      body: "this is a good deal buy now",
      price: "3",
      user_id: "1",
      deal_id: "1",
      date: "25/3/24",
      expiry: "28/3/24",
    },
    {
      title: "Shoes",
      category: "Fashion",
      location: "place",
      image:
        "https://as2.ftcdn.net/v2/jpg/02/11/11/15/1000_F_211111574_VLtzH6ORhebXvnJXjlkAkaUuAftnvmJH.jpg",
      votes: "30",
      body: "great deal!",
      price: "10",
      user_id: "3",
      deal_id: "2",
      date: "25/3/24",
      expiry: "28/3/24",
    },
    {
      title: "Bicycle",
      category: "Sports & Outdoors",
      location: "place",
      image:
        "https://as1.ftcdn.net/v2/jpg/02/34/95/64/1000_F_234956425_JFdJ1zSitfgwvJx5TD9xbXlOBOTgeqKn.jpg",
      votes: "2",
      body: "on offer now",
      price: "5",
      user_id: "3",
      deal_id: "3",
      date: "25/3/24",
      expiry: "28/3/24",
    },
  ];

  useEffect(() => {
    const currentDeals = [...new Set(dealsData.map((deal) => deal))];

    setDeals(currentDeals);
  }, []);

  const url =
    "https://www.amazon.co.uk/Shark-NZ690UK-Lift-Away-Anti-Allergen-Turquoise/dp/B0B3RY7Y8L?ref_=Oct_DLandingS_D_3bc4d327_3&th=1"; //placeholder sharing url
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Deal Chasers: " + "\n" + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of: ", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dealsCard}
      onPress={() => handleDealsPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.dealsImage} />
      <View style={styles.dealsInfo}>
        <Text style={styles.dealsTitle}>{item.title}</Text>
        <View style={styles.dealsColumnContainer}>
          <View style={styles.dealsInfoColumns}>
            <Text style={styles.dealsText}>{item.category}</Text>
            <Text style={styles.dealsPrice}>£{item.price}</Text>
          </View>
          <View style={styles.infoColumns}>
            <Text style={styles.dealsText}>Date: {item.date}</Text>
            <Text style={styles.dealsText}>Votes: {item.votes}</Text>
            <Pressable onPress={onShare}>
              <Image
                style={styles.dealsShareImage}
                source={require(`../assets/share4.png`)}
              ></Image>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const handleDealsPress = (deal) => {
    console.log("Navigating to single deal page:", deal);
  };

  return (
    <View style={styles.dealsContainer}>
      <FlatList
        data={deals}
        renderItem={renderItem}
        keyExtractor={(item) => item.deal_id}
        horizontal={false}
        numColumns={1}
        contentContainerStyle={styles.dealsList}
      />
    </View>
  );
};

export default Deals;
