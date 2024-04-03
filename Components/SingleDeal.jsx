import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles";
import SingleDealComments from "./SingleDealComments";
import CommentsForm from "./CommentsForm";
import { supabase } from "../lib/supabase";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import onShare from "./ShareHelper";

const url =
  "https://www.amazon.co.uk/Shark-NZ690UK-Lift-Away-Anti-Allergen-Turquoise/dp/B0B3RY7Y8L?ref_=Oct_DLandingS_D_3bc4d327_3&th=1"; // Placeholder sharing url

const SingleDeal = ({ route }) => {
  const { deal } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dealData, setDealData] = useState(deal);
  const [authorName, setAuthorName] = useState("");
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    fetchComments();
    fetchAuthor();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data: comments, error } = await supabase
        .from("deal_comments")
        .select()
        .eq("deal_id", deal.deal_id);

      if (error) {
        throw new Error("Error fetching comments: " + error.message);
      }

      if (comments && comments.length > 0) {
        setComments([...comments]);
      } else {
        console.log("No comments found for this deal.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthor = async () => {
    try {
      const { data: authorData, error } = await supabase
        .from("users")
        .select("username")
        .eq("user_id", deal.author)
        .single();

      if (error) {
        throw new Error("Error fetching author: " + error.message);
      }

      if (authorData) {
        setAuthorName(authorData.username);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCommentSubmit = async (comment) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!deal || !deal.deal_id) {
        throw new Error("Deal ID is missing or invalid.");
      }

      const { data, error } = await supabase.from("deal_comments").insert([
        {
          body: comment,
          author: user.id,
          deal_id: deal.deal_id,
        },
      ]);

      if (error) {
        throw new Error("Error posting comment: " + error.message);
      }

      console.log("Comment posted successfully:", comment);
      setComments([
        ...comments,
        { body: comment, author: user.id, deal_id: deal.deal_id },
      ]);
      fetchComments();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVote = async (voteType) => {
    try {
      let voteIncrement = 0;
      if (voteType === "up") {
        voteIncrement = 1;
      } else if (voteType === "down") {
        voteIncrement = -1;
      }
      const { data, error } = await supabase
        .from("deals")
        .update({ votes: dealData.votes + voteIncrement })
        .eq("deal_id", dealData.deal_id);

      if (error) {
        throw new Error("Error updating vote count: " + error.message);
      }

      console.log("Vote updated successfully:", voteType);
      setHasVoted(true)
      setDealData((prevDealData) => ({
        ...prevDealData,
        votes: prevDealData.votes + voteIncrement,
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSharePress = () => {
    onShare(deal);
  };
  
  const formattedDate = new Date(deal.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date(deal.created_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.singleDealContainer}>
        <View style={styles.singleDealsCard}>
          <View style={styles.singleDealsImageContainer}>
            <Image
              source={{ uri: deal.image_url }}
              style={styles.SingleDealsImage}
            />
          </View>
          {hasVoted ? (<View style={styles.voteButtons}>
            <FontAwesome
              name="thumbs-down"
              size={24}
              color="grey"
              
            />
            <Text style={styles.singleDealVote}>Votes: {dealData.votes}</Text>
            <FontAwesome
              name="thumbs-up"
              size={24}
              color="grey"
              
            />
            <View style={styles.dealShareContainer}>
              <Pressable onPress={handleSharePress}>
                <Icon name="share" size={24} color="white" />
              </Pressable>
            </View>
          </View>) :(<View style={styles.voteButtons}>
            <FontAwesome
              name="thumbs-down"
              size={24}
              color="white"
              onPress={() => handleVote("down")}
            />
            <Text style={styles.singleDealVote}>Votes: {dealData.votes}</Text>
            <FontAwesome
              name="thumbs-up"
              size={24}
              color="white"
              onPress={() => handleVote("up")}
            />
            <View style={styles.dealShareContainer}>
              <Pressable onPress={handleSharePress}>
                <Icon name="share" size={24} color="white" />
              </Pressable>
            </View>
          </View>
          )}

          <View style={styles.singleDealsTextInfo}>
            <Text style={styles.singleDealTitle}>{deal.title}</Text>
            <Text style={styles.singleDealPosted}>
              Posted {formattedTime} on {formattedDate}
            </Text>
            <Text style={styles.singleDealCat}>Author: {authorName}</Text>
            <Text style={styles.singleDealCat}>{deal.category}</Text>
            <Text style={styles.singleDealBody}>{deal.body}</Text>
          </View>
        </View>

        <CommentsForm onCommentSubmit={handleCommentSubmit} />
        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <SingleDealComments style={styles.commentsList} deal={deal.deal_id} />
        )}
      </View>
    </ScrollView>
  )
};

export default SingleDeal;
