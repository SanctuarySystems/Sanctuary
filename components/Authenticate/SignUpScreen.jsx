import React, { useState, useContext } from 'react';
import { SafeAreaView, View, TextInput, Button, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { authentication } from "./firebase.js";
import GlobalStyles from '../GlobalStyles.js';
import { UsernameContext } from '../../App.js';

const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { username, setUsername } = useContext(UsernameContext);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match, please try again.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: newUsername });
      await sendEmailVerification(user);
      await setUsername(newUsername);
      navigation.navigate('Select Icon Screen');
    } catch (error) {
      setErrorMessage("All fields are required");
      console.log(error);
    }
  };

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
            placeholder="Username"
            onChangeText={(text) => setNewUsername(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="confirmPassword"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
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
    fontFamily: 'Times New Roman',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#90AACB',
    marginBottom: 50,
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

export default SignUpScreen;