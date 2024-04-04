import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import onShare from './ShareHelper';

const DealItem = ({ item, categories, onPress }) => {
  const category = categories.find(cat => cat.category_id === item.category_id);
  const formattedDate = new Date(item.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleSharePress = () => {
    onShare(item);
  };

  return (
    <TouchableOpacity
      style={styles.dealsCard}
      onPress={() => onPress(item)}>
      <Image source={{ uri: item.image_url }} style={styles.dealsImage} />
      <View style={styles.dealsInfo}>
        <Text style={styles.dealsTitle}>{item.title}</Text>
        <Text style={styles.dealsText}>Category: {category ? category.name : 'N/A'}</Text>
        <Text style={styles.dealsText}>Added: {formattedDate}</Text>
        <Text style={styles.dealsText}>Votes: {item.votes}</Text>
        <Text style={[styles.dealsText, styles.priceText]}>Price: £{item.price}</Text>
      </View>
      <View style={styles.shareContainer}>
        <Pressable onPress={handleSharePress}>
          <Icon name="share" size={24} color="#FF6347" />
        </Pressable>
      </View>
      <TouchableOpacity
        style={styles.getDealButton}
        onPress={() => onPress(item)}>
        <Text style={styles.getDealText}>Show Deal</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};


export default DealItem;
