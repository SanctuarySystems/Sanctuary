import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Comment = ({ username, body, pops }) => {
  const [pop, setPop] = useState(pops);

  return (
    <View style={styles.comment}>
      <Text>I'm a comment</Text>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.popCount}>{pop}</Text>
      <Text style={styles.pop} onPress={() => setPop(pop + 1)}>pop</Text>
      <Text style={styles.plop} onPress={() => setPop(pop - 1)}>plop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    backgroundColor: '#FAF9F6',
    borderRadius: '5%',
    borderWidth: 2,
    borderColor: 'purple',
    shadowColor: 'purple',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20%',
    width: '90%',
    marginBottom: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  username: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  popCount: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  pop: {
    position: 'absolute',
    bottom: 10,
    right: 50,
  },
  plop: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
});

export default Comment;
