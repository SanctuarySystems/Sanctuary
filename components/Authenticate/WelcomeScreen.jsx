import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Sanctuary
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login Screen')}
          style={styles.button}
          color='#90AACB'
        />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Sign Up Screen')}
          style={styles.button}
          color='#90AACB'
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Select Icon"
          onPress={() => navigation.navigate('Select Icon Screen')}
          style={styles.button}
          color='#90AACB'
        />
        <Button
          title="Change Password"
          onPress={() => navigation.navigate('Change Password Screen')}
          style={styles.button}
          color='#90AACB'
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
    fontFamily: "Times New Roman",
    fontSize: 65,
    fontWeight: 'bold',
    color: '#90AACB',
    marginBottom: 135,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    fontFamily: "Times New Roman",
    color: '#FFB085',
    fontSize: 60,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
});
export default WelcomeScreen;