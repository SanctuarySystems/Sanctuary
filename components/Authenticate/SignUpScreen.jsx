import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firebase.js";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match, please try again.");
      return;
    }
    try {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(async (userCredential) => {
          const { user } = userCredential;
          await user.updateProfile({ displayName: username });
          await user.sendEmailVerification();
          navigation.navigate('Welcome Screen', {
            username,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <Button title="Signup" onPress={handleSubmit} />
    </View>
  );
};

export default SignUpScreen;
