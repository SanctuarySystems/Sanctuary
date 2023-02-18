import React, { useState, useContext } from 'react';
import { SafeAreaView, View, TextInput, Button, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import axios from 'axios';
import { useFonts } from 'expo-font';
import GlobalStyles from '../GlobalStyles.js';
import { UsernameContext } from '../../App.js';

const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [goodUsername, setGoodUsername] = useState(false);
  const { setUsername } = useContext(UsernameContext);

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBubbles: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  const handleUsername = () => {
    console.log('in handle username');
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${newUsername}`)
      .then(({ data }) => {
        if (data.length === 0) {
          setGoodUsername(true);
        } else {
          setErrorMessage("Username is taken, please try again.");
        }
      });
  };

  const handleSubmit = async () => {
    handleUsername();
    if (password && confirmPassword && goodUsername) {
      setErrorMessage("Passwords do not match, please try again.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: newUsername });
      await sendEmailVerification(user);
      await setUsername(newUsername);
      navigation.navigate('Select Icon Screen');
    } catch (error) {
      setErrorMessage("All fields are required");
      console.log(error);
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
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Username"
            onChangeText={(text) => setNewUsername(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="confirmPassword"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
          {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignUpScreen;