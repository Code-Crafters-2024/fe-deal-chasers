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
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
const Deals = () => {
  const navigation = useNavigation();
  const [deals, setDeals] = useState([]);
  useEffect(() => {
    fetchDeals();
  }, []);
  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase.from('deals').select('*');
      if (error) {
        throw error;
      }
      setDeals(data);
    } catch (error) {
      console.error('Error fetching deals:', error.message);
    }
  };
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
      <Image source={{ uri: item.image_url }} style={styles.dealsImage} />
      <View style={styles.dealsInfo}>
        <Text style={styles.dealsTitle}>{item.title}</Text>
        <View style={styles.dealsColumnContainer}>
          <View style={styles.dealsInfoColumns}>
            <Text style={styles.dealsText}>{item.category}</Text>
            <Text style={styles.dealsPrice}>£{item.price}</Text>
          </View>
          <View style={styles.infoColumns}>
            <Text style={styles.dealsText}>Date: {item.created_at}</Text>
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
    navigation.navigate("SingleDeal", { deal });
  };
  return (
    <View>
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
    </View>
  );
};
export default Deals;
