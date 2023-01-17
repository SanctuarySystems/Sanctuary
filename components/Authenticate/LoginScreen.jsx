import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from 'firebase/app';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSubmit} />
    </View>
  );
};

export default LoginScreen;