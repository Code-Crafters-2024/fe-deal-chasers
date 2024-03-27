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
        tabBarIcon: ({ color, size, focused }) => {
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
        tabBarStyle: { backgroundColor: '#333333' },
        tabBarActiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="Deals" component={DealsScreen} options={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="Map" component={MapScreen} options={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="Login" component={LoginScreen} options={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
