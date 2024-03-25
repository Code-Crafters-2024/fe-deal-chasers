import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles';
import { supabase } from '../lib/supabase';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('name');
      if (error) {
        throw error;
      }
      if (data) {
        setCategories(data.map(category => category.name));
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item)}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.categoryImage}
      />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>{item}</Text>
        <Text style={styles.categoryDescription}>Description of {item} category goes here.</Text>
      </View>
    </TouchableOpacity>
  );

  const handleCategoryPress = (category) => {
    console.log('Navigating to deals under category:', category);
  };

  return (
    <View style={styles.CategoryContainer}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal={false}
        numColumns={1}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

export default CategoriesScreen;
