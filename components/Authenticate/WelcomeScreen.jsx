import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    Fuzzy: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
    Merienda: require('../../assets/fonts/Merienda-ExtraBold.ttf'),
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
      source={require('../../assets/images/texture5.png')}
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
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Sign Up Screen')}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
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
    marginTop: 160,
  },
  header: {
    fontFamily: 'Merienda',
    fontSize: 72,
    color: 'rgba(49, 94, 153, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  logoContainer: {
    marginTop: -280,
  },
  logo: {
    width: 900,
    height: 900,
    resizeMode: 'contain',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 45,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'rgba(49, 94, 153, 1)',
    paddingHorizontal: 105,
    paddingVertical: 13,
    borderRadius: 15,
    marginBottom: 10,
  },
  loginButtonText: {
    fontFamily: 'FuzzyBold',
    fontSize: 26,
    color: '#FEF1E6',
  },
  registerButton: {
    borderColor: 'rgba(49, 94, 153, 1)',
    backgroundColor: '#fef1e6',
    borderWidth: 2,
    paddingHorizontal: 94,
    paddingVertical: 11,
    borderRadius: 15,
  },
  registerButtonText: {
    fontFamily: 'FuzzyBold',
    fontSize: 26,
    color: 'rgba(49, 94, 153, 1)',
  },
});
export default WelcomeScreen;
