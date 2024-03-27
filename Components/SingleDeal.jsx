import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable, Share } from "react-native";
import { styles } from "../styles";
import SingleDealComments from "./SingleDealComments";
import CommentsForm from "./CommentsForm"; // Import the CommentsForm component
import { supabase } from "../lib/supabase";
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
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    try {
      const { data: comments, error } = await supabase
        .from("deal_comments")
        .select();
      if (error) {
        console.error("Error fetching comments:", error.message);
      } else {
        if (comments !== undefined) {
          setComments([...comments]);
        } else {
          console.error("Comments data is undefined");
        }
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  const handleCommentSubmit = async (comment) => {
    try {
      if (deal && deal.deal_id) {
        const { data, error } = await supabase
          .from("deal_comments")
          .insert([{ body: comment, deal_id: deal.deal_id }]);
        if (error) {
          console.error("Error posting comment:", error.message);
        } else {
          console.log("Comment posted successfully:", comment);
          setComments([...comments, comment]);
          fetchComments();
        }
      } else {
        console.error("Deal ID is missing or invalid.");
      }
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };
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
      <CommentsForm onCommentSubmit={handleCommentSubmit} />
      <SingleDealComments style={styles.dealsList} deal={deal.deal_id} />
    </View>
  );
};
export default SingleDeal;
