import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const ManageAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Login button pressed');
    if (username === 'test' && password === 'test') {
      console.log('login success');
    } else {
      console.log('login failed');
    }
  };

  const handleSignup = () => {
    // Navigate to signup page
    console.log('Signup button pressed');
    // navigation.navigate('Signup')
  };

  return (
    <View>
      <Text>Welcome to our app!</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignup}>
        <Text>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageAccount;