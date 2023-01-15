import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Comments from './components/Comments/Comments.js';
import ConfessionList from './components/Confession/ConfessionList';

import Profile from './components/Profile/Profile';
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
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  }


});
