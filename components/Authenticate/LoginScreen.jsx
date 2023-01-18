import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firebase.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(authentication, email, password);
      navigation.navigate('Welcome Screen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSubmit} />
    </View>
  );
};

export default LoginScreen;