import React, { useState } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import HomeScreen from './components/navigation/HomeScreen.jsx';
import WelcomeScreen from './components/Authenticate/WelcomeScreen.jsx';
import LoginScreen from "./components/Authenticate/LoginScreen.jsx";
import SignUpScreen from "./components/Authenticate/SignUpScreen.jsx";
import SelectIconScreen from "./components/Manage/SelectIconScreen.jsx";
import ChangePasswordScreen from "./components/Manage/ChangePasswordScreen.jsx";
import ForgotPasswordScreen from "./components/Manage/ForgotPasswordScreen.jsx";

export const UsernameContext = React.createContext();
const Stack = createNativeStackNavigator();

const App = () => {
  const [username, setUsername] = useState('');
  const [userToken, setUserToken] = useState('');

  return (
    <NavigationContainer>
      <UsernameContext.Provider value={{ username, setUsername, userToken, setUserToken }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
