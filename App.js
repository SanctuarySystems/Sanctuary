import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/navigation/HomeScreen.jsx';
import WelcomeScreen from './components/Authenticate/WelcomeScreen.jsx';
import { MainStackNavigator } from './components/navigation/StackNavigator.jsx';
import LoginScreen from "./components/Authenticate/LoginScreen.jsx";
import SignUpScreen from "./components/Authenticate/SignUpScreen.jsx";
import SelectIconScreen from "./components/Manage/SelectIconScreen.jsx";
import ChangePasswordScreen from "./components/Manage/ChangePasswordScreen.jsx";

export const UsernameContext = React.createContext();
const Stack = createNativeStackNavigator();

const App = () => {
  const [username, setUsername] = useState('lookingforpeace');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
        <Stack.Screen name="Login Screen" component={LoginScreen} setUsername={setUsername} />
        <Stack.Screen name="Sign Up Screen" component={SignUpScreen} setUsername={setUsername} />
        <Stack.Screen name="Select Icon Screen" component={SelectIconScreen} />
        <Stack.Screen name="Change Password Screen" component={ChangePasswordScreen} />
        <Stack.Screen name="Home Screen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/* <NavigationContainer>
  <HomeScreen />
</NavigationContainer> */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const App = () => {
// return (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Second Page" component={SecondPageTest} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );
// };

export default App;
