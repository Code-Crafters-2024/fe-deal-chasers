import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DealsScreen from "./screens/DealsScreen";
import LoginScreen from "./screens/LoginScreen";
import SingleDeal from "./Components/SingleDeal";
import MapScreen from "./screens/MapScreen";
import PostDealScreen from "./screens/PostDealScreen";
import SingleDealScreen from "./screens/SingleDealScreen";
import CustomHeader from "./Components/CustomHeader";

import "react-native-url-polyfill/auto";
import { supabase } from "./lib/supabase";
import { useState, useEffect } from "react";

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
        name="SingleDealScreen"
        component={SingleDealScreen}
        options={{
          headerShown: false,
          headerTitle: "Back to Deals",
          headerStyle: {
            backgroundColor: "#333333",
          },
          headerTintColor: "#FF6347",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="PostDealScreen"
        component={PostDealScreen}
        options={{
          headerTitle: "Back to Deals",
          headerStyle: {
            backgroundColor: "#333333",
          },
          headerTintColor: "#FF6347",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "account";
          } else if (route.name === "Deals") {
            iconName = "sale";
          } else if (route.name === "Add Deal") {
            iconName = "plus";
          } else if (route.name === "Login") {
            iconName = "login";
          } else if (route.name === "Map") {
            iconName = "map-search";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarStyle: { backgroundColor: "#333333" },
        tabBarActiveTintColor: "white",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <CustomHeader />,
          headerStyle: { backgroundColor: "#333333" },
          headerTitleAlign: "center",
          headerTintColor: "#FF6347",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Deals"
        component={DealsStack}
        options={{
          header: () => <CustomHeader />,
          headerShown: true,
          headerStyle: { backgroundColor: "#333333" },
          headerTitleAlign: "center",
          headerTintColor: "#FF6347",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Add Deal"
        component={PostDealScreen}
        options={{
          header: () => <CustomHeader />,
          headerShown: true,
          headerStyle: { backgroundColor: "#333333" },
          headerTitleAlign: "center",
          headerTintColor: "#FF6347",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          header: () => <CustomHeader />,
          headerShown: true,
          headerStyle: { backgroundColor: "#333333" },
          headerTitleAlign: "center",
          headerTintColor: "#FF6347",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />

      {session && session.user ? (
        <Tab.Screen
          name="Profile"
          // component={ProfileScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
            headerStyle: { backgroundColor: "#333333" },
            headerTitleAlign: "center",
            headerTintColor: "#FF6347",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
            },
          }}
        >
          {() => <ProfileScreen session={session} />}
        </Tab.Screen>
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: () => <CustomHeader />,
            headerShown: true,
            headerStyle: { backgroundColor: "#333333" },
            headerTitleAlign: "center",
            headerTintColor: "#FF6347",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};
export default TabNavigator;
