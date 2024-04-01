import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DealsScreen from './screens/DealsScreen';
import LoginScreen from './screens/LoginScreen';
import SingleDeal from './Components/SingleDeal';
import MapScreen from './screens/MapScreen';
import PostDealScreen from './screens/PostDealScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const DealsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="All Deals"
        component={DealsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleDeal"
        component={SingleDeal}
        options={{
          headerTitle: "Back to Deals",
          headerStyle: {
            backgroundColor: '#333333',
          },
          headerTintColor: '#FF6347',
          headerTitleStyle: {
            fontSize: 16,
          },
          // headerTitleAlign: 'center', 
        }}
      />
      <Stack.Screen 
        name="PostDealScreen" 
        component={PostDealScreen}
        options={{ title: "Post Deal" }} 
      />
    </Stack.Navigator>
  );
};
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
        headerShown: false,
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="Deals" component={DealsStack} options={{
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        headerShown: false,
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="Map" component={MapScreen} options={{
        headerShown: false,
        headerStyle: { backgroundColor: 'white' },
        headerTitleAlign: 'center',
        headerTintColor: '#FF6347',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        }
      }} />
      <Tab.Screen name="Login" component={LoginScreen} options={{
        headerShown: false,
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














