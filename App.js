import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import HomeScreen from './components/navigation/HomeScreen.jsx';
import WelcomeScreen from './components/Authenticate/WelcomeScreen.jsx';
import LoginScreen from "./components/Authenticate/LoginScreen.jsx";
import SignUpScreen from "./components/Authenticate/SignUpScreen.jsx";
import SelectIconScreen from "./components/Manage/SelectIconScreen.jsx";
import ChangePasswordScreen from "./components/Manage/ChangePasswordScreen.jsx";
import ForgotPasswordScreen from "./components/Manage/ForgotPasswordScreen.jsx";
import DebugScreen from './components/Authenticate/DebugScreen.jsx';

export const apiUrl = 'http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000';
// export const apiUrl = 'http://127.0.0.1';
export const UsernameContext = createContext();
const Stack = createNativeStackNavigator();

const App = () => {
  const [username, setUsername] = useState('');
  const [userToken, setUserToken] = useState('');

  return (
    <NavigationContainer>
      <UsernameContext.Provider value={{ username, setUsername, userToken, setUserToken }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            stackAnimation: 'fade',
          }}
        >
          <Stack.Screen name="Debug Screen" component={DebugScreen} />
          <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
          <Stack.Screen name="Login Screen" component={LoginScreen} />
          <Stack.Screen name="Sign Up Screen" component={SignUpScreen} />
          <Stack.Screen name="Select Icon Screen" component={SelectIconScreen} />
          <Stack.Screen name="Change Password Screen" component={ChangePasswordScreen} />
          <Stack.Screen name="Forgot Password Screen" component={ForgotPasswordScreen} />
          <Stack.Screen name="Home Screen" component={HomeScreen} />
        </Stack.Navigator>
      </UsernameContext.Provider>
    </NavigationContainer>
  );
};

export default App;
