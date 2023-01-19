import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Button } from 'react-native';
import * as firebase from 'firebase/app';
import { authentication } from "../Authenticate/firebase.js";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match, please try again.");
      return;
    }
    try {
      const user = await authentication.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword,
      );
      await user.reauthenticateWithCredential(credential);

      await user.updatePassword(newPassword);
      console.log('Password changed successfully');
      navigation.navigate('Home Screen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Old Password</Text>
      <TextInput
        placeholder="Old Password"
        secureTextEntry
        onChangeText={(text) => setOldPassword(text)}
      />
      <Text>New Password</Text>
      <TextInput
        placeholder="New Password"
        secureTextEntry
        onChangeText={(text) => setNewPassword(text)}
      />
      <Text>Confirm New Password</Text>
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
