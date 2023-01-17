import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from 'firebase/app';

const SignUpScreen = ({ navigation }) => {

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
        navigation.navigate('Select Icon Screen');
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
        <Button title="Passwords Do Not Match, Try Again" onPress={() => setNoMatch(false)} />
      ) : <Button title="Create Account" onPress={handleSubmit} />}
    </View>
  );
};

export default SignUpScreen;