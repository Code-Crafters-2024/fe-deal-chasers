import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DealsScreen from './screens/DealsScreen';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'Deals') {
            iconName = 'sale';
          } else if (route.name === 'Login') {
            iconName = 'login';
          } else if (route.name === 'Map') {
            iconName = 'map-search';
          } 

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        // tabBarStyle: { backgroundColor: '#333333' }, 
        // tabBarActiveTintColor: 'white', 
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Deals" component={DealsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
