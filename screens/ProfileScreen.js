import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

const ProfileScreen = ({ route }) => {
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={styles.text}>Welcome to the Profile Screen!</Text>
    </View>
  );
};

export default ProfileScreen;
