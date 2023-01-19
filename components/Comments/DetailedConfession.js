import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const DetailedConfession = ({ username, space, body, setShowModal }) => {
  return (
    <View style={styles.confession}>
      <Text>{space}</Text>
      <Text style={styles.username}>{username}</Text>
      <Text>{body}</Text>
      <TouchableOpacity style={styles.dots} onPress={() => setShowModal(true)}>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </TouchableOpacity>
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
  username: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  dots: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
});

export default DetailedConfession;