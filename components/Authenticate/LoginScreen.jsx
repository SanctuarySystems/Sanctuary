import React, { useState, useContext } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Button, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firebase.js";
import { UsernameContext } from '../../App.js';
import { useFonts } from 'expo-font';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { username, setUsername } = useContext(UsernameContext);

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBubbles: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(authentication, email, password);
      // setUsername(authentication.currentUser.username);
      await setUsername(authentication.currentUser.displayName);
      navigation.navigate('Home Screen');
    } catch (error) {
      setErrorMessage("Incorrect email or password, please try again");
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    navigation.navigate('Forgot Password Screen');
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.inputContainer} behavior='padding' keyboardVerticalOffset={150}>
          <Text style={styles.header}>Sanctuary</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleForgotPassword}
            >
              <Text style={styles.buttonText}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 2,
  },
  header: {
    fontFamily: 'Virgil',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#90AACB',
    marginBottom: 70,
  },
  inputContainer: {
    alignItems: 'center',
    width: '80%',
  },
  inputBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FAF9F6',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    marginTop: 70,
  },
  button: {
    backgroundColor: "#FFB085",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    fontFamily: "FuzzyBubbles",
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LoginScreen;
