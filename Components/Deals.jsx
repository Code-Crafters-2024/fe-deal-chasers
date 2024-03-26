import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Pressable, Share } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from '@expo/vector-icons'; 
import { styles } from "../styles";
import { supabase } from '../lib/supabase';

const Deals = ({ category }) => {
  const [deals, setDeals] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchDeals();
  }, [category]);

  const fetchDeals = async () => {
    try {
      let { data: allDeals, error } = await supabase
        .from('deals')
        .select('*');

      if (error) {
        throw error;
      }

      sortDeals(selectedSortOption);

      const categoryIds = allDeals.map(deal => deal.category_id);
      const { data: categoriesData, error: categoryError } = await supabase
        .from('categories')
        .select('category_id, name')
        .in('category_id', categoryIds);

      if (categoryError) {
        throw categoryError;
      }

      const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.category_id] = category.name;
        return acc;
      }, {});

      allDeals = allDeals.map(deal => ({
        ...deal,
        category: categoriesMap[deal.category_id]
      }));

      const filteredDeals = category ? allDeals.filter(deal => deal.category === category) : allDeals;
      setDeals(filteredDeals);
    } catch (error) {
      console.error('Error fetching deals:', error.message);
    }
  };

  const sortDeals = (option) => {
    const sortedDeals = [...deals].sort((a, b) => {
      if (option === 'created_at') {
        const dateA = new Date(a[option]);
        const dateB = new Date(b[option]);
        if (sortOrder === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      } else {
        // For other options like price and votes, use numeric comparison
        if (sortOrder === 'asc') {
          return a[option] - b[option];
        } else {
          return b[option] - a[option];
        }
      }
    });
    setDeals(sortedDeals);
  };

  const handleSortChange = (option) => {
    if (option === selectedSortOption) {
      // Toggle between asc and desc
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
    } else {
      setSelectedSortOption(option);
      // Reset the sort order to asc when a new option is selected
      setSortOrder('asc');
    }
    sortDeals(option);
  };

  const resetCategory = async () => {
    try {
      let { data: allDeals, error } = await supabase
        .from('deals')
        .select('*');

      if (error) {
        throw error;
      }

      const categoryIds = allDeals.map(deal => deal.category_id);
      const { data: categoriesData, error: categoryError } = await supabase
        .from('categories')
        .select('category_id, name')
        .in('category_id', categoryIds);

      if (categoryError) {
        throw categoryError;
      }

      const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.category_id] = category.name;
        return acc;
      }, {});

      allDeals = allDeals.map(deal => ({
        ...deal,
        category: categoriesMap[deal.category_id]
      }));

      setDeals(allDeals);
    } catch (error) {
      console.error('Error resetting category:', error.message);
    }
  };


  const url = "https://www.amazon.co.uk/Shark-NZ690UK-Lift-Away-Anti-Allergen-Turquoise/dp/B0B3RY7Y8L?ref_=Oct_DLandingS_D_3bc4d327_3&th=1"; // Placeholder sharing url

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
    const createdAtDate = new Date(item.created_at);
    const formattedDate = createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return (
      <TouchableOpacity style={styles.dealsCard} onPress={() => handleDealsPress(item)}>
        <Image source={{ uri: item.image_url }} style={styles.dealsImage} /> 
        <View style={styles.dealsInfo}>
          <Text style={styles.dealsTitle}>{item.title}</Text>
          <Text style={styles.dealsText}>Category: {item.category}</Text>
          <Text style={styles.dealsText}>Price: £{item.price}</Text>
          <Text style={styles.dealsText}>Date: <Text>{formattedDate}</Text></Text>
          <Text style={styles.dealsText}>Votes: {item.votes}</Text>
        </View>
        <View style={styles.shareContainer}>
          <Pressable onPress={onShare}>
            <Image style={styles.dealsShareImage} source={require(`../assets/share4.png`)} />
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };
  

  const handleDealsPress = (deal) => {
    console.log("Navigating to single deal page:", deal);
    // Handle navigation to single deal page here
  };

  return (
    <View style={styles.dealsContainer}>
      {category !== null && category !== undefined && (
        <TouchableOpacity onPress={resetCategory} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Category</Text>
        </TouchableOpacity>
      )}
      <View style={styles.sortContainer}>
        <Picker
          selectedValue={selectedSortOption}
          onValueChange={(itemValue, itemIndex) => handleSortChange(itemValue)}>
          <Picker.Item label="Sort by Price" value="price" />
          <Picker.Item label="Sort by Date" value="created_at" />
          <Picker.Item label="Sort by Votes" value="votes" />
        </Picker>
      </View>
      <FlatList
        data={deals}
        renderItem={renderItem}
        keyExtractor={(item) => item.deal_id.toString()}
        horizontal={false}
        numColumns={1}
        contentContainerStyle={styles.dealsList}
        refreshing={false} // Add refreshing prop
        onRefresh={fetchDeals} // Add onRefresh prop
      />
    </View>
  );
};

export default Deals;

