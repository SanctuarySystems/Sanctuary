import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

const DetailedConfession = ({ username, space, date, body, setShowModal }) => {
  return (
    <View style={styles.confession}>
      <View style={styles.info}>
        <Text>{username}</Text>
        <Entypo name="dot-single" size={24} color="black" />
        <Text>{space}</Text>
        <Entypo name="dot-single" size={24} color="black" />
        <Text>{new Date(date).toLocaleString("en-us", { month: "short", day: "numeric" })}</Text>
      </View>
      <Text>{body}</Text>
      <TouchableOpacity style={styles.dots} onPress={() => setShowModal(true)}>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  confession: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    padding: '15%',
    marginBottom: '3%',
  },
  username: {
    position: 'absolute',
    left: 10,
  },
  dots: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 10,
  },
});

export default DetailedConfession;