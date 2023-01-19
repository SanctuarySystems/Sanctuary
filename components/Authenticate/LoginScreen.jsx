import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firebase.js";

const LoginScreen = ({ navigation, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(authentication, email, password);
      // setUsername(authentication.currentUser.username);
      console.log('user', authentication.currentUser.displayName);
      navigation.navigate('Welcome Screen');
    } catch (error) {
      console.log(error);
    }
    // navigation.navigate('Home Screen');
  };
  return (
    <SafeAreaView>
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
      <Button title="Sign In" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default LoginScreen;

