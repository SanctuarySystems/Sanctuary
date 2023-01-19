import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const UsernameContext = React.createContext();

const WelcomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('lookingforpeace');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Sanctuary
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login Screen', {
            setUsername,
          })}
          style={styles.button}
        />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Sign Up Screen', {
            setUsername,
          })}
          style={styles.button}
        />
        <Button
          title="Select Icon"
          onPress={() => navigation.navigate('Select Icon Screen')}
          style={styles.button}
        />
        <Button
          title="Change Password"
          onPress={() => navigation.navigate('Change Password Screen')}
          style={styles.button}
        />
      </View>
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
  header: {
    fontFamily: 'Times New Roman',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#90AACB',
    marginBottom: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    fontFamily: 'Times New Roman',
    backgroundColor: '#FFB085',
    fontSize: 60,
    marginHorizontal: 10,
  },
});
export default WelcomeScreen;
