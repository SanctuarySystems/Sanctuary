import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Sanctuary
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login Screen')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sign Up Screen')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
export default WelcomeScreen;

// <View style={styles.buttonContainer}>
//   <Button
//     title="Select Icon"
//     onPress={() => navigation.navigate('Select Icon Screen')}
//     style={styles.button}
//     color='#90AACB'
//   />
//   <Button
//     title="Change Password"
//     onPress={() => navigation.navigate('Change Password Screen')}
//     style={styles.button}
//     color='#90AACB'
//   />
// </View>;