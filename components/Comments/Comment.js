import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

const Comment = ({ username, body, pops, setShowModal }) => {
  const [pop, setPop] = useState(pops);
  const [popped, setPopped] = useState(false);
  const [plopped, setPlopped] = useState(false);

  const handlePop = () => {
    if (popped === false) {
      if (plopped === true) {
        setPlopped(false);
        setPop(pop + 2);
      } else {
        setPop(pop + 1);
      }
      setPopped(true);
    } else {
      setPop(pop - 1);
      setPopped(false);
    }
  };

  const handlePlop = () => {
    if (plopped === false) {
      if (popped === true) {
        setPopped(false);
        setPop(pop - 2);
      } else {
        setPop(pop - 1);
      }
      setPlopped(true);
    } else {
      setPop(pop + 1);
      setPlopped(false);
    }
  };

  return (
    <View style={styles.comment}>
      <Text>{body}</Text>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity style={styles.dots} onPress={() => setShowModal(true)}>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.vote}>
        <TouchableOpacity style={popped ? styles.pop : null} onPress={handlePop}>
          <FontAwesome5 name="arrow-alt-circle-up" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.popCount}>{pop > 1 ? pop : 1}</Text>
        <TouchableOpacity style={plopped ? styles.plop : null} onPress={handlePlop}>
          <FontAwesome5 name="arrow-alt-circle-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  },
  pop: {
    backgroundColor: 'lightgreen',
    borderRadius: '50%',
  },
  plop: {
    backgroundColor: 'red',
    borderRadius: '55%',
  },
});

export default Comment;
