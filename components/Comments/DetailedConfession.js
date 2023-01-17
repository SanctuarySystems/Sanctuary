import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DetailedConfession = () => {
  return (
    <View style={styles.confession}>
      <Text>I am a Detailed confession.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  confession: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '15%',
    marginBottom: '3%',
  },
});

export default DetailedConfession;