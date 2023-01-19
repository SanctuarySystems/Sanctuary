import React, { useState } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/navigation/HomeScreen.jsx';

export const UsernameContext = React.createContext();

const App = () => {
  const [username, setUserName] = useState('lookingforcalm');

  return (
    <NavigationContainer>
      <UsernameContext.Provider value={username}>
        <HomeScreen />
      </UsernameContext.Provider>
    </NavigationContainer>
  );
};

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