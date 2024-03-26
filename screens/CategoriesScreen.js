import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { styles } from '../styles';
import { supabase } from '../lib/supabase';

const CategoriesScreen = () => {
  const navigation = useNavigation(); // Access the navigation prop using useNavigation hook

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('name, description');
      if (error) {
        throw error;
      }
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item)}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.categoryImage}
      />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>{item.name}</Text>
        <Text style={styles.categoryDescription}>{truncateDescription(item.description)}</Text> 
      </View>
    </TouchableOpacity>
  );

  const handleCategoryPress = (category) => {
    console.log('Navigating to deals under category:', category.name );
    navigation.navigate('Deals', { category: category.name });
  };

  return (
    <View style={styles.CategoryContainer}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        numColumns={1}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

export default CategoriesScreen;
