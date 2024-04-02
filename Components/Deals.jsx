import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../lib/supabase';
import DealItem from './DealItem';
import Search from "./Search";

const Deals = () => {
  const navigation = useNavigation();
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchDeals();
  }, [selectedCategory, sortBy, searchQuery]);

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
      if (searchQuery.trim() !== "") {
        data = data.filter(deal => deal.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }
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
    setSearchQuery("");
  };

  const handleSearch = () => {
    fetchDeals();
  };

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

  const handleAddDeal = () => {
    navigation.navigate("PostDealScreen");
  };
  
  const handleDealsPress = (deal) => {
    navigation.navigate("SingleDealScreen", { deal });
  };

  return (<View>
    <TouchableOpacity onPress={handleAddDeal} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>add a deal</Text>
        </TouchableOpacity>
    <View style={styles.dealsContainer}>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

      <View style={styles.dropdownContainer}>
        <View style={[styles.dropdown, styles.categoryDropdown]}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => handleCategoryChange(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}>
            <Picker.Item label="Filter" value={null} />
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
            <Picker.Item label="Sort" value={""} />
            <Picker.Item label="Price (lowest to highest)" value="price" />
            <Picker.Item label="Date (newest to oldest)" value="date" />
            <Picker.Item label="Votes (most to least)" value="votes" />
          </Picker>
        </View>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={deals}
        renderItem={({ item }) => (
          <DealItem item={item} categories={categories} onShare={onShare} onPress={handleDealsPress}  />
        )}
        keyExtractor={(item) => item.deal_id.toString()}
        horizontal={false}
        numColumns={1}
        contentContainerStyle={styles.dealsList}
      />
    </View>
  </View>
  );
};

export default Deals;
