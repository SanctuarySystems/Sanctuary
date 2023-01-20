import React, { useState } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, TextInput, Button, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "../Authenticate/firebase.js";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await sendPasswordResetEmail(authentication, email);
      setErrorMessage("A password reset link has been sent to your email.");
      navigation.navigate('Login Screen');
    } catch (error) {
      console.log('error');
      setErrorMessage('Please enter your email address');
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.inputContainer} behavior='padding' keyboardVerticalOffset={150}>
          <Text style={styles.header}>Sanctuary</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
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
    fontFamily: 'Times New Roman',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#90AACB',
    marginBottom: 80,
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
    marginTop: 80,
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

export default ForgotPasswordScreen;
