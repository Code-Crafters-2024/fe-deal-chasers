import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import DealItem from "./DealItem";
import Search from "./Search";
import TodaysDealsItems from "./TodaysDealsItems";
import MostPopularDealsItems from "./MostPopularDealsItems";

const HomePageDeals = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [todaysDeals, setTodaysDeals] = useState([]);
  const [mostPopularDeals, setMostPopularDeals] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchTodaysDeals();
    fetchMostPopularDeals();
  }, []);
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw error;
      }
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchTodaysDeals = async () => {
    try {
      let { data, error } = await supabase.from("deals").select("*");
      if (error) {
        throw error;
      }
      if (selectedCategory) {
        data = data.filter((deal) => deal.category_id === selectedCategory);
      }
      const shuffledDeals = [...data].sort(() => Math.random() - 0.5);
      setTodaysDeals(shuffledDeals);
    } catch (error) {
      console.error("Error fetching deals:", error.message);
    }
  };
  const fetchMostPopularDeals = async () => {
    try {
      let { data, error } = await supabase.from("deals").select("*");
      if (error) {
        throw error;
      }
      if (selectedCategory) {
        data = data.filter((deal) => deal.category_id === selectedCategory);
      }

      const mostPopularDeals = [...data].sort((a, b) => b.votes - a.votes);
      setMostPopularDeals(mostPopularDeals);
    } catch (error) {
      console.error("Error fetching deals:", error.message);
    }
  };

  

  const handleDealsPress = (deal) => {
    navigation.navigate("SingleDealScreen", { deal });
  };

  return (
    <View style={styles.homeDealsContainer}>
      
        {/* <Image source={require("../assets/2.png")} style={styles.logo} /> */}
        <Text style={styles.dealsTitle}>Todays Deals</Text>
        <FlatList
          data={todaysDeals.slice(0, 5)}
          renderItem={({ item }) => (
            <TodaysDealsItems
              item={item}
              categories={categories}
              onPress={handleDealsPress}
            />
          )}
          keyExtractor={(item) => item.deal_id.toString()}
          horizontal={true}
          
          contentContainerStyle={styles.HomeDealsList}
        />

  
      <Text style={styles.dealsTitle}> Most Popular</Text>
      <FlatList
        data={mostPopularDeals.slice(0, 5)}
        renderItem={({ item }) => (
          <MostPopularDealsItems
            item={item}
            categories={categories}
            onPress={handleDealsPress}
          />
        )}
        keyExtractor={(item) => item.deal_id.toString()}
        horizontal={true}
        
        contentContainerStyle={styles.HomeDealsList}
      />
    </View>
  );
};

export default HomePageDeals;
