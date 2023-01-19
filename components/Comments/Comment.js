import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

const Comment = ({ username, body, pops, setShowModal, date }) => {
  const [pop, setPop] = useState(pops);
  const [popped, setPopped] = useState(false);
  const [plopped, setPlopped] = useState(false);

  const handlePop = () => {
    if (popped === false) {
      if (plopped === true) {
        setPlopped(false);
        if (pop === 1) {
          setPop(pop + 1);
        } else {
          setPop(pop + 2);
        }
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
    if (pop > 1 || (popped === true && pop > 2)) {
      if (plopped === false) {
        if (popped === true) {
          if (popped === 2) {
            setPopped(false);
            setPop(pop - 1);
          } else {
            setPopped(false);
            setPop(pop - 1);
          }
        } else {
          setPop(pop - 1);
        }
        setPlopped(true);
      } else {
        setPop(pop + 1);
        setPlopped(false);
      }
    }
  };

  return (
    <View style={styles.comment}>
      <Text>{body}</Text>
      <View style={styles.info}>
        <Text style={styles.username}>{username}</Text>
        <Entypo name="dot-single" size={24} color="black" />
        <Text>{new Date(date).toLocaleString("en-us", { month: "short", day: "numeric" })}</Text>
      </View>
      <TouchableOpacity style={styles.dots} onPress={() => setShowModal(true)}>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.vote}>
        <TouchableOpacity style={popped ? styles.pop : null} onPress={handlePop}>
          <FontAwesome5 name="arrow-alt-circle-up" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.popCount}>{pop}</Text>
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
  info: {
    position: 'absolute',
    top: 0,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
