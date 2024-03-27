import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const DealItem = ({ item, categories, onShare }) => {
  const category = categories.find(cat => cat.category_id === item.category_id);
  const formattedDate = new Date(item.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.dealsCard}
      onPress={() => console.log("Navigating to single deal page:", item)}>
      <Image source={{ uri: item.image_url }} style={styles.dealsImage} />
      <View style={styles.dealsInfo}>
        <Text style={styles.dealsTitle}>{item.title}</Text>
        <Text style={styles.dealsText}>Category: {category ? category.name : 'N/A'}</Text>
        <Text style={styles.dealsText}>Added: {formattedDate}</Text>
        <Text style={styles.dealsText}>Votes: {item.votes}</Text>
        <Text style={[styles.dealsText, styles.priceText]}>Price: £{item.price}</Text>
      </View>
      <View style={styles.shareContainer}>
        <Pressable onPress={onShare}>
          <Icon name="share" size={24} color="#FF6347" />
        </Pressable>
      </View>
      <TouchableOpacity
        style={styles.getDealButton}
        onPress={() => console.log("Handle Get Deal:", item.link)}>
        <Text style={styles.getDealText}>Get Deal</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DealItem;
