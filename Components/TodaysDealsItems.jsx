import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodaysDealsItems = ({ item, categories, onShare, onPress }) => {

  return (
    <View>
      <TouchableOpacity
        style={styles.todaysDealsCard}
        onPress={() => onPress(item)}>
        <Image source={{ uri: item.image_url }} style={styles.todaysDealsImage} />
        <View style={styles.cardContent}>
          <Text style={styles.homeDealTitle}>{item.title}</Text>
        </View>
        <View style={styles.cardPrice}>
          <Text style={styles.price}>£{item.price}</Text>
        </View>
        <View style={styles.getDealContainer}>
        <TouchableOpacity
            style={styles.homeGetDealButton}
            onPress={() => console.log("Handle Get Deal:", item.link)}>
            <Text style={styles.homeGetDealText}>Get Deal</Text>
          </TouchableOpacity>
          </View>
      </TouchableOpacity>
      
    </View>

  );
};


export default TodaysDealsItems;
