import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';

const Comment = ({ username, body, pops, setShowModal, date, commentId, confessionId }) => {
  const [pop, setPop] = useState(pops);
  const [popped, setPopped] = useState(false);
  const [plopped, setPlopped] = useState(false);

  const handlePop = () => {
    if (popped === false) {
      if (plopped === false) {
        setPopped(true);
        setPop(pop + 1);
        axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confessionId}/${commentId}/pop`)
          .catch((err) => console.error(err));
      } else {
        setPopped(true);
        setPlopped(false);
        axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confessionId}/${commentId}/pop`)
          .catch((err) => console.error(err));
        axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confessionId}/${commentId}/pop`)
          .catch((err) => console.error(err));
        setPop(pop + 2);
      }
    } else {
      axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confessionId}/${commentId}/plop`)
        .catch((err) => console.error(err));
      setPopped(false);
      setPop(pop - 1);
    }
  };

  const handlePlop = () => {
    if (plopped === false) {
      if (popped === false) {
        axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confessionId}/${commentId}/plop`)
          .catch((err) => console.error(err));
        setPlopped(true);
        setPop(pop - 1);
      } else {
        axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confessionId}/${commentId}/plop`)
          .catch((err) => console.error(err));
        axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confessionId}/${commentId}/plop`)
          .catch((err) => console.error(err));
        setPlopped(true);
        setPopped(false);
        setPop(pop - 2);
      }
    } else {
      axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confessionId}/${commentId}/plop`)
        .catch((err) => console.error(err));
      setPlopped(false);
      setPop(pop + 1);
    }
  };

  return (
    <View style={styles.comment}>
      <Text>{body}</Text>
      <View style={styles.info}>
        <Text style={styles.username}>{username}</Text>
        <Entypo name="dot-single" size={24} color="black" />
        <Text>{moment(date).fromNow()}</Text>
      </View>
      <TouchableOpacity style={styles.dots} onPress={() => setShowModal(true)}>
        <Entypo name="dots-three-horizontal" size={24} color="black" onPress={() => setShowModal(true)} />
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
    alignItems: 'center',
    padding: '15%',
    width: '100%',
    marginBottom: '3%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(255, 255, 255, .85)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(27, 52, 83, .08)',
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
    right: 15,
    top: 5,
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
