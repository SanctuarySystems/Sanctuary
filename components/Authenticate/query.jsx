// Hello, I am building out my react native application, we are using a state in our app.js to store our global username variable 'username' that has the setUsername function. We currently have it set up such that the setUsername function is passed as a prop to my stack.screen 'Sign Up Screen', which is part of a stack.Navigator. so when the user logs in, the sign up screen is supposed to have access to that setUsername function, and it passes the new username back to app.js where it is passed into a react context 'UsernameContext'. This way, any screen in our app should be able to access the current username using useContext. However, it seems that you are not able to pass functions as a prop like this in react native. What can we change or do differently to allow a username to be saved at the authentication stage then be easily accessed or imported from any other file. Below I will paste the code for my app.js file

// import React, { useState } from 'react';
// // import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './components/navigation/HomeScreen.jsx';
// import WelcomeScreen from './components/Authenticate/WelcomeScreen.jsx';
// import LoginScreen from "./components/Authenticate/LoginScreen.jsx";
// import SignUpScreen from "./components/Authenticate/SignUpScreen.jsx";
// import SelectIconScreen from "./components/Manage/SelectIconScreen.jsx";
// import ChangePasswordScreen from "./components/Manage/ChangePasswordScreen.jsx";
// import ForgotPasswordScreen from "./components/Manage/ForgotPasswordScreen.jsx";

// export const UsernameContext = React.createContext();
// const Stack = createNativeStackNavigator();

// const App = () => {
//   const [username, setUsername] = useState('lookingforpeace');

//   return (
//     <NavigationContainer>
//       <UsernameContext.Provider value={username}>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
//           <Stack.Screen name="Login Screen" component={LoginScreen} setUsername={setUsername} />
//           <Stack.Screen name="Sign Up Screen" component={SignUpScreen} setUsername={setUsername} />
//           <Stack.Screen name="Select Icon Screen" component={SelectIconScreen} />
//           <Stack.Screen name="Change Password Screen" component={ChangePasswordScreen} />
//           <Stack.Screen name="Forgot Password Screen" component={ForgotPasswordScreen} />
//           <Stack.Screen name="Home Screen" component={HomeScreen} />
//         </Stack.Navigator>
//       </UsernameContext.Provider>
//     </NavigationContainer>
//   );
// };

// export default App;

// and here is the code for my sign up screen

// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
// import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
// import { authentication } from "./firebase.js";
// import GlobalStyles from '../GlobalStyles.js';

// const auth = getAuth();

// const SignUpScreen = ({ navigation, setUsername }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [newUsername, setNewUsername] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async () => {
//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match, please try again.");
//       return;
//     }
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       const user = auth.currentUser;
//       console.log('user', user);
//       await updateProfile(user, { displayName: newUsername });
//       await sendEmailVerification(user);
//       setUsername(newUsername);
//       console.log(newUsername);
//       navigation.navigate('Select Icon Screen');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container}>
//       <Text style={styles.header}>Sanctuary</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.inputBox}
//           placeholder="Email"
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           style={styles.inputBox}
//           placeholder="Username"
//           onChangeText={(text) => setNewUsername(text)}
//         />
//         <TextInput
//           style={styles.inputBox}
//           placeholder="Password"
//           onChangeText={(text) => setPassword(text)}
//         />
//         <TextInput
//           style={styles.inputBox}
//           placeholder="confirmPassword"
//           secureTextEntry
//           onChangeText={(text) => setConfirmPassword(text)}
//         />
//       </View>
//       {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
//       <View style={styles.buttonContainer}>
//         <Button style={styles.button} title="Sign Up" onPress={handleSubmit} />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FEF1E6',
//   },
//   header: {
//     fontFamily: 'Times New Roman',
//     fontSize: 60,
//     fontWeight: 'bold',
//     color: '#90AACB',
//     marginBottom: 150,
//   },
//   inputContainer: {
//     alignItems: 'center',
//     width: '80%',
//   },
//   inputBox: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     margin: 10,
//     borderRadius: 10,
//     backgroundColor: '#FAF9F6',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     width: '80%',
//     marginTop: 30,
//   },
//   button: {
//     fontFamily: 'Times New Roman',
//     backgroundColor: '#FFB085',
//     fontSize: 60,
//     marginHorizontal: 10,
//   },
// });

// export default SignUpScreen;
