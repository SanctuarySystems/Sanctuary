import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import authentication from "./firebase.js";
import { UsernameContext } from '../../App.js';
import { DEFAULT_EMAIL, DEFAULT_PASSWORD } from '@env';

const DebugScreen = ({ navigation }) => {

  const { setUsername, setUserToken } = useContext(UsernameContext);

  const signInWithDefaultUser = async () => {
    try {
      await signInWithEmailAndPassword(authentication, DEFAULT_EMAIL, DEFAULT_PASSWORD);
      const user = authentication.currentUser;
      const idToken = await user.getIdToken();
      await setUsername(user.displayName);
      await setUserToken(idToken);
      navigation.navigate('Home Screen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome Screen')}
      >
        <Text style={styles.buttonText}>Go to Welcome Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={signInWithDefaultUser}
      >
        <Text style={styles.buttonText}>Skip to Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF1E6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(49, 94, 153, 0.9)',
    paddingHorizontal: 30,
    paddingVertical: 17,
    borderRadius: 15,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'FuzzyBubbles',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FEF1E6',
  },
});

export default DebugScreen;
