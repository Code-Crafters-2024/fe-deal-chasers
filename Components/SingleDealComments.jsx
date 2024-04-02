import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles";
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
        .eq("deal_id", deal)
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  useEffect(() => {
    fetchAuthorNames();
  }, [comments]);

  const fetchAuthorNames = async () => {
    try {
      const authorIds = comments
        .map(comment => comment.author)
        .filter(authorId => authorId !== undefined);
      
      if (authorIds.length === 0) {
        return;
      }
  
      const { data, error } = await supabase
        .from("users")
        .select("username, user_id")
        .in("user_id", authorIds);
  
      if (error) {
        throw error;
      }
  
      const authorMap = {};
      data.forEach(author => {
        
        authorMap[author.user_id] = author.username;
      });
  
      const updatedComments = comments.map(comment => ({
        ...comment,
        author: authorMap[comment.author]
      }));
  
      setComments(updatedComments);
    } catch (error) {
      console.error("Error fetching author names:", error.message);
    }
  };

  return (
    <View style={styles.commentsList}>
      {comments.map((comment) => (
        <TouchableOpacity key={comment.deal_comment_id} style={styles.singleDealsCommentsCard}>
          <View style={styles.singleDealsInfo}>
            <Text style={styles.singleDealsTitle}>{comment.author} commented</Text>
            <Text style={styles.singleDealsText}>{comment.created_at}</Text>
            <Text style={styles.singleDealsText}>{comment.body}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SingleDealComments;
