import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodaysDealsItems = ({ item, categories, onShare, onPress }) => {

  return (
    <TouchableOpacity
      style={styles.todaysDealsCard}
      onPress={() => onPress(item)}>
      <Image source={{ uri: item.image_url }} style={styles.todaysDealsImage} />
      <Text>£{item.price}</Text>
    </TouchableOpacity>
  );
};


export default TodaysDealsItems;
