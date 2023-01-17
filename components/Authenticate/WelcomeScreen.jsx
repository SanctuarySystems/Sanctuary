import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import LoginScreen from './LoginScreen.jsx';
import SignUpScreen from './SignUpScreen.jsx';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>
        Welcome to Sanctuary!
      </Text>
      <Text>Login</Text>
      <Button
        title="Go to Login Screen"
        onPress={() => navigation.navigate('Login Screen')}
      />
      <Text>Welcome Page</Text>
      <Button
        title="Go to Sign Up Screen"
        onPress={() => navigation.navigate('Sign Up Screen')}
      />
    </View>
  );
};

export default WelcomeScreen;