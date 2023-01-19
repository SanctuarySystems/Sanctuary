import React, { useState } from 'react';
import { View, KeyboardAvoidingView, TextInput, Button, Text, StyleSheet } from 'react-native';
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
      setErrorMessage(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>Sanctuary</Text>
      <View style={styles.inputContainer}>
        <Text>Enter your email below to reset your password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />
      </View>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Submit" onPress={handleSubmit} />
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
    marginBottom: 150,
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
    marginTop: 30,
  },
  button: {
    fontFamily: 'Times New Roman',
    backgroundColor: '#FFB085',
    fontSize: 60,
    marginHorizontal: 10,
  },
});

export default ForgotPasswordScreen;
