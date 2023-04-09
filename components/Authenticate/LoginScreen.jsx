import React, { useState, useContext } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import authentication from "./firebase.js";
import { UsernameContext } from '../../App.js';
import { useFonts } from 'expo-font';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUsername, setUserToken } = useContext(UsernameContext);

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
    Merienda: require('../../assets/fonts/Merienda-ExtraBold.ttf'),
  });

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(authentication, email, password);
      const user = authentication.currentUser;
      const idToken = await user.getIdToken();
      await setUsername(user.displayName);
      await setUserToken(idToken);
      navigation.navigate('Home Screen');
    } catch (error) {
      setErrorMessage("Incorrect email or password, please try again");
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    navigation.navigate('Forgot Password Screen');
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
          <Text style={styles.header}>Login</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputBox}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef1e6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    fontFamily: 'Merienda',
    fontSize: 54,
    color: 'rgba(49, 94, 153, 1)',
    marginTop: -50,
    marginBottom: 45,
  },
  inputContainer: {
    alignItems: 'center',
    width: '80%',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 5,
  },
  label: {
    fontFamily: 'FuzzyBold',
    fontSize: 18,
    color: 'rgba(49, 94, 153, 1)',
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  inputBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#FAF9F6',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: 'rgba(49, 94, 153, 1)',
    paddingHorizontal: 105,
    paddingVertical: 13,
    borderRadius: 15,
    marginTop: 55,
  },
  loginButtonText: {
    fontFamily: 'FuzzyBold',
    fontSize: 26,
    color: '#FEF1E6',
  },
  forgotPasswordText: {
    fontFamily: 'FuzzyBold',
    fontSize: 20,
    color: 'rgba(49, 94, 153, 1)',
    textDecorationLine: 'underline',
    marginTop: 18,
  },
});

export default LoginScreen;
