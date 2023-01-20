import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
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
      setErrorMessage("All fields are");
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>Sanctuary</Text>
      <View style={styles.inputContainer}>
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
      </View>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    marginTop: 50,
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
