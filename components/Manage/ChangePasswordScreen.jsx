import React, { useState } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
      setErrorMessage("Incorrect new or old password, please try again.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>Sanctuary</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Old Password"
          onChangeText={(text) => setOldPassword(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="New Password"
          secureTextEntry
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Confirm New Password"
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF1E6',
  },
  header: {
    fontFamily: 'Times New Roman',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#90AACB',
    marginBottom: 50,
  },
  inputContainer: {
    alignItems: 'center',
    width: '80%',
  },
  inputBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FAF9F6',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    marginTop: 50,
  },
  button: {
    backgroundColor: "#FFB085",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    fontFamily: "Times New Roman",
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ChangePasswordScreen;