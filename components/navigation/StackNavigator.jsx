import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Home from "../screens/Home.jsx";
import Spaces from "../screens/Spaces.jsx";
import Search from "../search/Search.jsx";
import SpacesForm from "../search/SpacesForm.jsx";
import Comments from "../Comments/Comments";
import Profile from "../Profile/Profile";
import Notifications from "../Profile/Notifications";
import WelcomeScreen from "../Authenticate/WelcomeScreen.jsx";
import LoginScreen from "../Authenticate/LoginScreen.jsx";
import SignUpScreen from "../Authenticate/SignUpScreen.jsx";
import SelectIconScreen from "../Manage/SelectIconScreen.jsx";
import ChangePasswordScreen from "../Manage/ChangePasswordScreen.jsx";
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View} from 'react-native';
import Space from '../Space/Space.js';

const Stack = createNativeStackNavigator();


// const screenOptionStyle = {
//   headerStyle: {
//     backgroundColor: '#F9D5A7',
//     fontWeight: 'bold',
//     fontSize: 65,
//     fontFamily: 'Virgil'
//   },
//   headerTitleStyle: {
//     color: "#90AACB",
//     fontSize: 40,
//     fontWeight: 'bold',

//   },
//   headerTintColor: "white",
//   headerBackTitle: "Back",

// };

const MainStackNavigator = ({ setUsername }) => {

  const [fontsLoaded] = useFonts({
    'Virgil': require('../../assets/fonts/Virgil.ttf'),
    'FuzzyReg': require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    'FuzzyBold': require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (<View><Text>Fonts Loading</Text></View>)
  } else {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Space" component={Space} />
      <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
      <Stack.Screen name="Select Icon Screen" component={SelectIconScreen} />
      <Stack.Screen name="Change Password Screen" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
  }
};

const SpaceStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Spaces" component={Spaces} options={{ username: 'lookingforpeace' }} />
      <Stack.Screen name="Space" component={Space} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Search Spaces" component={Search} />
      <Stack.Screen name="Spaces Form" component={SpacesForm} />
      <Stack.Screen name="Space" component={Space} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Space" component={Space} />
      <Stack.Screen name="Select Icon Screen" component={SelectIconScreen} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

const screenOptionStyle = StyleSheet.create({

  headerStyle: {
    backgroundColor: '#F9D5A7',
    fontWeight: 'bold',
    fontSize: 65,
    // flex: 1,
  },
  headerTitleStyle: {
    color: "rgba(49, 94, 153, 1)",
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Virgil'
  },

});

export {
  MainStackNavigator,
  ProfileStackNavigator,
  SpaceStackNavigator,
  SearchStackNavigator,
};