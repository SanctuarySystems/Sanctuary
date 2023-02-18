import React, { useState } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, Text, TextInput, Button, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import * as firebase from 'firebase/app';
import { useFonts } from 'expo-font';
import authentication from "../Authenticate/firebase.js";

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBubbles: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

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

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.inputContainer} behavior='padding' keyboardVerticalOffset={150}>
          <Text style={styles.header}>Sanctuary</Text>
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
      </SafeAreaView>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 2,
  },
  header: {
    fontFamily: 'Virgil',
    fontSize: 60,
    fontWeight: 'bold',
    color: 'rgba(49, 94, 153, 1)',
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
    fontFamily: "FuzzyBubbles",
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ChangePasswordScreen;