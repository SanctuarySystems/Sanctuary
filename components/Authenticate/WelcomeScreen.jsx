import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    Fuzzy: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
    Merienda: require('../../assets/fonts/Merienda-Bold.ttf'),
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
    marginTop: 135,
  },
  header: {
    fontFamily: 'Merienda',
    fontSize: 78,
    color: 'rgba(49, 94, 153, 1)',
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
    marginTop: -290,
  },
  logo: {
    width: 960,
    height: 960,
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
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  loginButtonText: {
    fontFamily: 'FuzzyBold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FEF1E6',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'FuzzyBold',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  signupLink: {
    fontFamily: 'FuzzyBold',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(49, 94, 153, 1)',
    marginLeft: 5,
  },
});

export default WelcomeScreen;
