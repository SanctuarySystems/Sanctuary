import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from 'firebase/app';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match, please try again.");
      return;
    }
    try {
      const user = auth().currentUser;
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        oldPassword,
      );
      await user.reauthenticateWithCredential(credential);
      if (newPassword !== confirmPassword) {
        throw new Error("New passwords don't match");
      }
      await user.updatePassword(newPassword);
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
      <Button title="Change Password" onPress={handleSubmit} />
    </View>
  );
};

export default ChangePassword;
