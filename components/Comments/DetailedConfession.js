import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const DetailedConfession = () => {

  return (
    <View style={styles.confession}>
      <Text>I'm a DETAILED confession.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  confession: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    padding: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '3%',
    borderWidth: '3',
  },
});

export default DetailedConfession;