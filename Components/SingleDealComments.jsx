import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
const SingleDealComments = ({ deal }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("deal_comments")
        .select("*")
        .eq("deal_id", deal);
      if (error) {
        throw error;
      }
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.singleDealsCommentsCard}>
      <View style={styles.singleDealsInfo}>
        <Text style={styles.singleDealsTitle}>
          Username: {item.deal_comment_id}
        </Text>
        <Text style={styles.singleDealsText}>{item.created_at} </Text>
        <Text style={styles.singleDealsText}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.deal_comment_id}
        horizontal={false}
        numColumns={1}
        contentContainerStyle={styles.commentsList}
      />
    </View>
  );
};
export default SingleDealComments;
