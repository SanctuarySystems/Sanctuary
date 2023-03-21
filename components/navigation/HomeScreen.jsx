import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { MainStackNavigator, ProfileStackNavigator, SearchStackNavigator, SpaceStackNavigator } from './StackNavigator.jsx';

const renderHome = ({ focused }) => {
  return focused ? <MaterialCommunityIcons name="home" size={34} color="#90AACB" /> : <MaterialCommunityIcons name="home" size={32} color="rgba(49, 94, 153, 1)" />;
};

const renderSpaces = ({ focused }) => {
  return focused ? <MaterialCommunityIcons name="google-classroom" size={28} color="#90AACB" /> : <MaterialCommunityIcons name="google-classroom" size={26} color="rgba(49, 94, 153, 1)" />;
};

const renderSearch = ({ focused }) => {
  return focused ? <Ionicons name="search" size={28} color="#90AACB" /> : <Ionicons name="search" size={26} color="rgba(49, 94, 153, 1)" />;
};

const renderProfile = ({ focused }) => {
  return focused ? <MaterialCommunityIcons name="account" size={34} color="#90AACB" /> : <MaterialCommunityIcons name="account" size={32} color="rgba(49, 94, 153, 1)" />;
};

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (

    <Tab.Navigator
      initialRouteName="My Home"
      screenOptions={{
        tabBarActiveTintColor: '#90AACB',
        tabBarInactiveTintColor: 'rgba(49, 94, 153, 1)',
        headerShown: false,
        tabBarInactiveBackgroundColor: '#F9D5A7',
        tabBarActiveBackgroundColor: '#F9D5A7',
        tabBarStyle: {
          backgroundColor: '#F9D5A7',
          height: 70,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {
          padding: 7,
        },
      }}
      tabBarOptions={{
        safeAreaInsets: {
          bottom: 0,
        },
        style: {
          backgroundColor: 'white',
        },
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