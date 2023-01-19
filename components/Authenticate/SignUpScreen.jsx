import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Button, Text } from 'react-native';
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
      navigation.navigate('Select Icon Screen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Username</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setNewUsername(text)}
      />
      <Text>Email</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Text>Confirm Password</Text>
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <Button title="Signup" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default SignUpScreen;
