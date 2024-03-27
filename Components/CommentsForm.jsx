import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { styles } from "../styles";
import { supabase } from '../lib/supabase';




const CommentsForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState("");
  const handleCommentSubmit = () => {
    onCommentSubmit(comment);
    setComment(""); // Clear the comment input field after submission
  };
  return (
    <View style={styles.commentCard}>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Submit" onPress={handleCommentSubmit} />
    </View>
  );
};
export default CommentsForm;