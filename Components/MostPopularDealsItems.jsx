import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const MostPopularDealsItems = ({ item, onPress }) => {


  return (
    <TouchableOpacity
      style={styles.mostPopularDealsCard}
      onPress={() => onPress(item)}>
      <Image source={{ uri: item.image_url }} style={styles.mostPopularDealsImage} />
      <Text style={styles.dealTitle}>{item.title}</Text> 
      <Text>votes: {item.votes}</Text>
    </TouchableOpacity>
  );
};


export default MostPopularDealsItems;
