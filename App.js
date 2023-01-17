import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/navigation/HomeScreen.jsx';

const App = () => {
  return (
    <NavigationContainer>
      <HomeScreen />
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