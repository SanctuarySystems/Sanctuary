import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { MainStackNavigator, ProfileStackNavigator, SearchStackNavigator, SpaceStackNavigator } from './StackNavigator.jsx';

const renderHome = () => {
  return <MaterialCommunityIcons name="home" size={30} color="white" />;
};

const renderSpaces = () => {
  return <MaterialCommunityIcons name="google-classroom" size={25} color="white" />;
};

const renderSearch = () => {
  return <Ionicons name="search" size={25} color="white" />;
};

const renderProfile = () => {
  return <MaterialCommunityIcons name="account" size={30} color="white" />;
};

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (

    <Tab.Navigator
      initialRouteName="My Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
        tabBarInactiveBackgroundColor: '#772E25',
        tabBarActiveBackgroundColor: '#772E25',
      }}
    >
      <Tab.Screen
        name="My Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: renderHome,
        }}
      />
      <Tab.Screen
        name="My Spaces"
        component={SpaceStackNavigator}
        options={{
          tabBarLabel: 'Spaces',
          tabBarIcon: renderSpaces,
        }}
      />
      <Tab.Screen
        name="Search Spaces"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: renderSearch,
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderProfile,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;