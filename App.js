import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Comments from './components/Comments/Comments.js';
import Space from './components/Space/Space.js';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Profile /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
