import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  Share,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles";
import { supabase } from '../lib/supabase';
import Icon from 'react-native-vector-icons/FontAwesome';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchDeals();
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        throw error;
      }
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const fetchDeals = async () => {
    try {
      let { data, error } = await supabase.from('deals').select('*');
      if (error) {
        throw error;
      }
      if (selectedCategory) {
        data = data.filter(deal => deal.category_id === selectedCategory);
      }
      data.sort((a, b) => {
        if (sortBy === 'price') {
          return a.price - b.price;
        } else if (sortBy === 'date') {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy === 'votes') {
          return b.votes - a.votes;
        }
      });
      setDeals(data);
    } catch (error) {
      console.error('Error fetching deals:', error.message);
    }
  };


  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSortBy(null);
  };

  useEffect(() => {
    fetchDeals();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory !== null) {
      fetchDeals();
    }
  }, [selectedCategory]);

  const url =
    "https://www.amazon.co.uk/Shark-NZ690UK-Lift-Away-Anti-Allergen-Turquoise/dp/B0B3RY7Y8L?ref_=Oct_DLandingS_D_3bc4d327_3&th=1"; //placeholder sharing url
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Deal Chasers: " + "\n" + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of: ", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({ item }) => {
    const category = categories.find(cat => cat.category_id === item.category_id);

    const formattedDate = new Date(item.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return (
      <TouchableOpacity
        style={styles.dealsCard}
        onPress={() => handleDealsPress(item)}
      >
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
            <Pressable onPress={onShare}>
              <Icon name="share" size={24} color="#FF6347" />
            </Pressable>
          </Pressable>
        </View>
        <TouchableOpacity
          style={styles.getDealButton}
          onPress={() => handleGetDeal(item.link)}
        >
          <Text style={styles.getDealText}>Get Deal</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };


  const handleDealsPress = (deal) => {
    console.log("Navigating to single deal page:", deal);
  };

  return (
    <View style={styles.dealsContainer}>
      <View style={styles.dropdownContainer}>
        <View style={[styles.dropdown, styles.categoryDropdown]}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => handleCategoryChange(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}>
            <Picker.Item label="Filter By" value={null} />
            {categories.map(category => (
              <Picker.Item key={category.category_id} label={category.name} value={category.category_id} />
            ))}
          </Picker>
        </View>
        <View style={[styles.dropdown, styles.sortByDropdown]}>
          <Picker
            selectedValue={sortBy}
            onValueChange={(itemValue) => handleSortByChange(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}>
            <Picker.Item label="Sort by" value={""} />
            <Picker.Item label="Price" value="price" />
            <Picker.Item label="Date" value="date" />
            <Picker.Item label="Votes" value="votes" />
          </Picker>
        </View>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={deals}
        renderItem={renderItem}
        keyExtractor={(item) => item.deal_id}
        horizontal={false}
        numColumns={1}
        contentContainerStyle={styles.dealsList}
      />
    </View>
  );
};

export default Deals;
