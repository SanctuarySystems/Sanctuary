import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Profile from './components/Profile';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello this is a test</Text>
      <StatusBar style="auto" />
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
