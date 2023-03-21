import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBubbles: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.headerContainer, opacity: fadeAnim }}>
        <Text style={styles.header}>Sanctuary</Text>
      </Animated.View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <Animated.View style={{ ...styles.bottomContainer, opacity: fadeAnim }}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login Screen')}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>First time here?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Sign Up Screen')}
          >
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF1E6',
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 170, // Adjust this value to move the header
  },
  header: {
    fontFamily: 'Virgil',
    fontSize: 72,
    color: 'rgba(49, 94, 153, 1)',
  },
  logoContainer: {
    marginTop: -225, // Adjust this value to move the logo
  },
  logo: {
    width: 825,
    height: 825,
    resizeMode: 'contain',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'rgba(49, 94, 153, 1)',
    paddingHorizontal: 100,
    paddingVertical: 17,
    borderRadius: 15,
    marginBottom: 15,
  },
  loginButtonText: {
    fontFamily: 'FuzzyBubbles',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FEF1E6',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'FuzzyBubbles',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  signupLink: {
    fontFamily: 'FuzzyBubbles',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(49, 94, 153, 1)',
    marginLeft: 5,
  },
});

export default WelcomeScreen;
