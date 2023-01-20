import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { MainStackNavigator, ProfileStackNavigator, SearchStackNavigator, SpaceStackNavigator } from './StackNavigator.jsx';

const renderHome = () => {
  return <MaterialCommunityIcons name="home" size={30} color="rgba(49, 94, 153, 1)" />;
};

const renderSpaces = () => {
  return <MaterialCommunityIcons name="google-classroom" size={25} color="rgba(49, 94, 153, 1)" />;
};

const renderSearch = () => {
  return <Ionicons name="search" size={25} color="rgba(49, 94, 153, 1)" />;
};

const renderProfile = () => {
  return <MaterialCommunityIcons name="account" size={30} color="rgba(49, 94, 153, 1)" />;
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
        tabBarInactiveBackgroundColor: '#F9D5A7',
        tabBarActiveBackgroundColor: '#F9D5A7',
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