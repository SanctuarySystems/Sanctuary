import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from 'firebase/app';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
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
      <Button title="Change Password" onPress={handleSubmit} />
    </View>
  );
};

export default ChangePassword;
