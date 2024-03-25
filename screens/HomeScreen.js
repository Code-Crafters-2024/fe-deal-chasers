import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/2.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default HomeScreen;