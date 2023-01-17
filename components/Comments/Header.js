import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Header = () => {

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Coding Addicts</Text>
      <TouchableOpacity style={styles.back}>
        <FontAwesome5 name='arrow-left' size={40} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2b90f5',
    height: '15%',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: '5%',
    color: 'white',
    fontWeight: 'bold',
  }
});

export default Header;