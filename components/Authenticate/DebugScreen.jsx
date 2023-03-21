import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const DebugScreen = ({ navigation }) => {
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
        onPress={() => navigation.navigate('Home Screen')}
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
