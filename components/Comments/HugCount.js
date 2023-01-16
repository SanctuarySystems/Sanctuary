import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const HugCount = () => {

  return (
    <View style={styles.hugCount}>
      <Text>10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hugCount: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

export default HugCount;