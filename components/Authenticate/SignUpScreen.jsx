import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from 'firebase/app';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [noMatch, setNoMatch] = useState(false);

  const handleSubmit = async () => {
    if (password === confirmPassword) {
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        const user = auth().currentUser;
        await user.sendEmailVerification();
      } catch (error) {
        console.log(error);
      }
    } else {
      setNoMatch(true);
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
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={text => setConfirmPassword(text)}
      />
      {noMatch ? (
        <Text>Passwords Do Not Match</Text>
        <Button onPress={() => setNoMatch(false)} />
      ) : null}
      <Button title="Create Account" onPress={handleSubmit} />
    </View>
  );
};

export default SignUpScreen;