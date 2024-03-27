import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import DealsScreen from './screens/DealsScreen';
import LoginScreen from './screens/LoginScreen';
import SingleDeal from './Components/SingleDeal';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const DealsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Deals" component={DealsScreen} />
      <Stack.Screen name="SingleDeal" component={SingleDeal} />
    </Stack.Navigator>
  );
};
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
          } else if (route.name === 'Categories') {
            iconName = 'format-list-bulleted';
          } else if (route.name === 'Deals') {
            iconName = 'sale';
          } else if (route.name === 'Login') {
            iconName = 'login';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        // tabBarStyle: { backgroundColor: '#333333' },
        // tabBarActiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Deals" component={DealsStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
};
export default TabNavigator;














