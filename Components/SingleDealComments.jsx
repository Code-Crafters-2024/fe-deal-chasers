import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "../styles";
import { supabase } from "../lib/supabase";

const SingleDealComments = ({ deal }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    try {
      setLoading(true);
      const initialComments = await supabase
        .from("deal_comments")
        .select("*")
        .eq("deal_id", deal)
        .order("created_at", { ascending: false });
      const authorIds = initialComments.data.map((comment) => {
        return comment.author;
      });
      if (authorIds.length === 0) {
        return;
      }
      const supabaseUsers = await supabase
        .from("users")
        .select("username, user_id")
        .in("user_id", authorIds);
      const authorMap = {};
      supabaseUsers.data.forEach((author) => {
        authorMap[author.user_id] = author.username;
      });
      const updatedComments = initialComments.data.map((comment) => {
        return {
          ...comment,
          author: authorMap[comment.author],
        };
      });
      setComments(updatedComments);
      if (initialComments.error || supabaseUsers.error) {
        throw error;
      }
    } catch (error) {
      console.log(err, "error");
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.commentsList}>
      {comments.length === 0 ? (
        <Text>No comments yet</Text>
      ) : (
        comments.map((comment) => (
          <TouchableOpacity
            key={comment.deal_comment_id}
            style={styles.singleDealsCommentsCard}
          >
            <View style={styles.singleDealsInfo}>
              <Text style={styles.singleDealsTitle}>
                {comment.author} commented
              </Text>
              <Text style={styles.singleDealsText}>{comment.created_at}</Text>
              <Text style={styles.singleDealsText}>{comment.body}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default SingleDealComments;
