import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

const DealsSCreen = () => {
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={styles.text}>Welcome to the Deals Screen!</Text>
    </View>
  );
};

export default DealsSCreen;
