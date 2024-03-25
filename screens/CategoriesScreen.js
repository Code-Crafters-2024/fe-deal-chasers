import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);

  // Dummy deals data (replace with data from backend/API)
  const dealsData = [
    { id: 1, title: 'Deal 1', category: 'Electronics' },
  { id: 2, title: 'Deal 2', category: 'Fashion' },
  { id: 3, title: 'Deal 3', category: 'Electronics' },
  { id: 4, title: 'Deal 4', category: 'Books' },
  { id: 5, title: 'Deal 5', category: 'Fashion' },
  { id: 6, title: 'Deal 6', category: 'Home & Kitchen' },
  { id: 7, title: 'Deal 7', category: 'Health & Beauty' },
  { id: 8, title: 'Deal 8', category: 'Sports & Outdoors' },
  ];

  useEffect(() => {
    // Extract unique categories from deals data
    const uniqueCategories = [...new Set(dealsData.map(deal => deal.category))];
    setCategories(uniqueCategories);
  }, []);

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
