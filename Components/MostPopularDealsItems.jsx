import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const MostPopularDealsItems = ({ item, onPress }) => {


  return (
    <View>
      <TouchableOpacity
        style={styles.mostPopularDealsCard}
        onPress={() => onPress(item)}>
        <Image source={{ uri: item.image_url }} style={styles.mostPopularDealsImage} />
        <View style={styles.cardContent}>
          <Text style={styles.homeDealTitle}>{item.title}</Text>
        </View>
        <View style={styles.cardPrice}>
        <Text style={styles.votesTitle}>votes: {item.votes}</Text>
        </View>
        <View style={styles.getDealContainer}>
        <TouchableOpacity
            style={styles.homeGetDealButton}
            onPress={() => onPress(item)}>
            <Text style={styles.homeGetDealText}>Show Deal</Text>
          </TouchableOpacity>
          </View>
      </TouchableOpacity>
    </View>
  );
};



export default MostPopularDealsItems;
