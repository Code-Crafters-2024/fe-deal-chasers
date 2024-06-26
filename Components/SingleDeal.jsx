import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { styles } from "../styles";
import SingleDealComments from "./SingleDealComments";
import CommentsForm from "./CommentsForm";
import { supabase } from "../lib/supabase";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import onShare from "./ShareHelper";

const url =
  "https://www.amazon.co.uk/Shark-NZ690UK-Lift-Away-Anti-Allergen-Turquoise/dp/B0B3RY7Y8L?ref_=Oct_DLandingS_D_3bc4d327_3&th=1"; // Placeholder sharing url

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function sendPushNotification(expoPushToken) {
  console.log("Sending push notification");
  const notificationToggler = true;
  if (notificationToggler) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Deal Chasers",
      body: "Check out this deal!",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
}

async function registerForPushNotificationsAsync() {
  token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  });
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  }

  return token.data;
}

const SingleDeal = ({ route }) => {
  const { deal } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dealData, setDealData] = useState(deal);
  const [authorName, setAuthorName] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!deal.image_url.startsWith("https://")) {
      downloadImage(deal.image_url);
    } else {
      setImageUrl(deal.image_url);
    }

    fetchComments();
    fetchAuthor();

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
        setHasUpVoted(true);
      } else if (voteType === "down") {
        setHasDownVoted(true);
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

      setDealData((prevDealData) => ({
        ...prevDealData,
        votes: prevDealData.votes + voteIncrement,
      }));

      if (voteType === "up" && dealData.votes + 1 === 100) {
        sendPushNotification(expoPushToken);
      }
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
  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("deals")
        .download(path);
      if (error) {
        throw error;
      }
      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setImageUrl(fr.result);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  const formattedExpiryDate = new Date(deal.expiry).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
  const resetCurrentVote = async (voteType) => {
    try {
      let voteIncrement = 0;
      if (voteType === "up") {
        voteIncrement = -1;
        setHasUpVoted(false);
      } else if (voteType === "down") {
        setHasDownVoted(false);
        voteIncrement = 1;
      }
      const { data, error } = await supabase
        .from("deals")
        .update({ votes: dealData.votes + voteIncrement })
        .eq("deal_id", dealData.deal_id);

      if (error) {
        throw new Error("Error updating vote count: " + error.message);
      }

      console.log("Vote updated successfully:", voteType);

      setDealData((prevDealData) => ({
        ...prevDealData,
        votes: prevDealData.votes + voteIncrement,
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.singleDealContainer}>
        <View style={styles.singleDealsCard}>
          <View style={styles.singleDealsImageContainer}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.SingleDealsImage}
              />
            ) : (
              <View style={styles.SingleDealsImage} />
            )}
          </View>
          <View style={styles.voteButtons}>
            {!hasDownVoted && !hasUpVoted ? (
              <>
                <FontAwesome
                  name="thumbs-down"
                  size={24}
                  color="white"
                  onPress={() => handleVote("down")}
                />

                <Text style={styles.singleDealVote}>
                  Votes: {dealData.votes}
                </Text>

                <FontAwesome
                  name="thumbs-up"
                  size={24}
                  color="white"
                  onPress={() => handleVote("up")}
                />
              </>
            ) : (
              <></>
            )}
            {hasDownVoted ? (
              <>
                <FontAwesome
                  name="thumbs-down"
                  size={24}
                  color="crimson"
                  onPress={() => {
                    setHasDownVoted(false);
                    resetCurrentVote("down");
                  }}
                />
                <Text style={styles.singleDealVote}>
                  Votes: {dealData.votes}
                </Text>
                <FontAwesome name="thumbs-up" size={24} color="grey" />
              </>
            ) : (
              <></>
            )}
            {hasUpVoted ? (
              <>
                <FontAwesome name="thumbs-down" size={24} color="grey" />
                <Text style={styles.singleDealVote}>
                  Votes: {dealData.votes}
                </Text>
                <FontAwesome
                  name="thumbs-up"
                  size={24}
                  color="lime"
                  onPress={() => {
                    setHasUpVoted(false);
                    resetCurrentVote("up");
                  }}
                />
              </>
            ) : (
              <></>
            )}
            <View style={styles.dealShareContainer}>
              <Pressable onPress={handleSharePress}>
                <Icon name="share" size={24} color="white" />
              </Pressable>
            </View>
          </View>

          <View style={styles.singleDealsTextInfo}>
            <Text style={styles.singleDealTitle}>{deal.title}</Text>
            <Text style={styles.singleDealPosted}>
              Posted {formattedTime} on {formattedDate}
            </Text>
            {deal.expiry != undefined ? (
              <Text style={styles.singleDealBody}>
                Deal expires: {formattedExpiryDate}
              </Text>
            ) : (
              <></>
            )}

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
  );
};

export default SingleDeal;
