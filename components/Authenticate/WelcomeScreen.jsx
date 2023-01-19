import React from 'react';
import { Button, Text, View, SafeAreaView } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>
        Welcome to Sanctuary!
      </Text>
      <Text>Login Screen</Text>
      <Button
        title="Go to Login Screen"
        onPress={() => navigation.navigate('Login Screen')}
      />
      <Text>Sign Up Screen</Text>
      <Button
        title="Go to Sign Up Screen"
        onPress={() => navigation.navigate('Sign Up Screen')}
      />
      <Text>Select Icon Screen</Text>
      <Button
        title="Go to Select Icon Screen"
        onPress={() => navigation.navigate('Select Icon Screen')}
      />
      <Text>Change Password Screen</Text>
      <Button
        title="Go to Change Password Screen"
        onPress={() => navigation.navigate('Change Password Screen')}
      />
      <Text>Home Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home Screen')}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;