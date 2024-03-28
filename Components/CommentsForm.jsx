import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { styles } from "../styles";




const CommentsForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState("");
  const handleCommentSubmit = () => {
    onCommentSubmit(comment);
    setComment("");
  };
  return (
    <View style={styles.commentCard}>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={setComment}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          onPress={handleCommentSubmit}
          color="#FF6347"
        />
      </View>
    </View>
  );
};
export default CommentsForm;