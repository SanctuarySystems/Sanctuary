import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Comment = ({ username, body, pops, setShowModal }) => {
  const [pop, setPop] = useState(pops);

  return (
    <View style={styles.comment}>
      <Text>{body}</Text>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity style={styles.dots} onPress={() => setShowModal(true)}>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.vote}>
        <TouchableOpacity style={styles.pop} onPress={() => setPop(pop + 1)}>
          <FontAwesome5 name="arrow-alt-circle-up" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.popCount}>{pop}</Text>
        <TouchableOpacity style={styles.plop} onPress={() => setPop(pop - 1)}>
          <FontAwesome5 name="arrow-alt-circle-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: '20%',
    width: '100%',
    marginBottom: '3%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  username: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  vote: {
    flexDirection: 'row',
    position: 'absolute',
    height: 50,
    width: 80,
    right: 10,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dots: {
    position: 'absolute',
    top: 10,
    right: 15,
  }
});

export default Comment;
