import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Button, Text, KeyboardAvoidingView, StyleSheet  } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { authentication } from "./firebase.js";
import GlobalStyles from '../GlobalStyles.js';

const auth = getAuth();

const SignUpScreen = ({ navigation, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match, please try again.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log('user', user);
      await updateProfile(user, { displayName: newUsername });
      await sendEmailVerification(user);
      // setUsername(newUsername);
      console.log(newUsername);
      navigation.navigate('Home Screen');
    } catch (error) {
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
          secureTextEntry
          onChangeText={(text) => setNewUsername(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
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
        <Button style={styles.button} title="Sign Up" onPress={handleSubmit} />
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
    marginBottom: 150,
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
    marginTop: 30,
  },
  button: {
    fontFamily: 'Times New Roman',
    backgroundColor: '#FFB085',
    fontSize: 60,
    marginHorizontal: 10,
  },
});

export default SignUpScreen;
