import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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
      navigation.navigate('Welcome Screen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Old Password"
        secureTextEntry
        onChangeText={(text) => setOldPassword(text)}
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        placeholder="Confirm New Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;
