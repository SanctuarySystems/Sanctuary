import React, { useState, useContext } from 'react';
import { View, SafeAreaView, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firebase.js";
import { UsernameContext } from '../../App.js';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { username, setUsername } = useContext(UsernameContext);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sanctuary</Text>
      <View style={styles.inputContainer}>
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
      </View>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleForgotPassword}
        >
          <Text style={styles.buttonText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF1E6',
  },
  header: {
    fontFamily: 'Times New Roman',
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
    fontFamily: "Times New Roman",
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LoginScreen;
