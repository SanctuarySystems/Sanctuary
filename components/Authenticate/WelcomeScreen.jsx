import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, ImageBackground } from 'react-native';
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
    <ImageBackground
      source={require('../../assets/images/texture.png')}
      style={styles.container}
    >
      <View style={styles.overlay} />
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
    </ImageBackground>
  );

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef1e6',
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255)', // Adjust the alpha value to control the opacity
  },
  logoContainer: {
    marginTop: -240, // Adjust this value to move the logo
  },
  logo: {
    width: 850,
    height: 850,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  signupLink: {
    fontFamily: 'FuzzyBubbles',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(49, 94, 153, 1)',
    marginLeft: 5,
  },
});

export default WelcomeScreen;
