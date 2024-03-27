import React, { useEffect, useState, component } from "react";
import { Text, View, Image, Pressable, Share } from "react-native";
import { styles } from "../styles";
import SingleDealComments from "./SingleDealComments";
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
const SingleDeal = ({ route }) => {
  const { deal } = route.params;
  return (
    <View style={styles.singleDealContainer}>
      <View style={styles.singleDealsCard}>
        <Image source={{ uri: deal.image_url }} style={styles.dealsImage} />
        <View style={styles.dealsInfo}>
          <Text style={styles.dealsTitle}>{deal.title}</Text>
          <View style={styles.dealsColumnContainer}>
            <View style={styles.dealsInfoColumns}>
              <Text style={styles.dealsText}>{deal.category}</Text>
              <Text style={styles.dealsPrice}>£{deal.price}</Text>
            </View>
            <View style={styles.infoColumns}>
              <Text style={styles.dealsText}>Date: {deal.date}</Text>
              <Text style={styles.dealsText}>Votes: {deal.votes}</Text>
              <Pressable onPress={onShare}>
                <Image
                  style={styles.dealsShareImage}
                  source={require(`../assets/share4.png`)}
                ></Image>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <SingleDealComments
        style={styles.dealsList}
        deal={deal.deal_id}
      ></SingleDealComments>
    </View>
  );
};
export default SingleDeal;












