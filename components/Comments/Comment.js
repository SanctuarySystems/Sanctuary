import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { UsernameContext, apiUrl } from '../../App.js';

const Comment = ({
  username,
  body,
  pops,
  date,
  commentId,
  confessionId,
  currentUser,
  userVoteStatus,
}) => {
  const [pop, setPop] = useState(pops);
  const [popped, setPopped] = useState(userVoteStatus === 1);
  const [plopped, setPlopped] = useState(userVoteStatus === -1);
  const { userToken } = useContext(UsernameContext);
  const [viewModal, setViewModal] = useState(false);

  const [fontsLoaded] = useFonts({
    BubbleBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
    BubbleRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
  });

  const handlePop = () => {
    if (!popped) {
      setPopped(true);
      axios.patch(`${apiUrl}/comments/${commentId}/pop/${currentUser}`, {}, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
        .catch((err) => console.error(err));
      if (!plopped) {
        setPop(pop + 1);
      } else {
        setPlopped(false);
        setPop(pop + 2);
      }
    }
  };

  const handlePlop = () => {
    if (!plopped) {
      setPlopped(true);
      axios.patch(`${apiUrl}/comments/${commentId}/plop/${currentUser}`, {}, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
        .catch((err) => console.error(err));
      if (!popped) {
        setPop(pop - 1);
      } else {
        setPopped(false);
        setPop(pop - 2);
      }
    }
  };

  const handleCommentReport = () => {
    setViewModal(false);
    axios.patch(`${apiUrl}/comments/${commentId}/report/${currentUser}`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .catch((error) => console.log(error));
  };

  if (!fontsLoaded) {
    return (<View><Text>still loading font</Text></View>);
  } else {
    return (
      <View style={styles.comment}>
        <Text style={{fontFamily: 'BubbleRegular', fontSize: 20}}>{body}</Text>
        <View style={styles.info}>
          <Text style={styles.username}>{username}</Text>
          <Entypo name="dot-single" size={24} color="black" />
          <Text style={{fontFamily: 'BubbleRegular', color: 'rgba(49, 94, 153, 1)'}}>{moment(date).fromNow()}</Text>
        </View>
        <TouchableOpacity style={styles.dots} onPress={() => setViewModal(true)}>
          <Entypo name="dots-three-horizontal" size={20} color="black" onPress={() => setViewModal(true)} />
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

            <Modal styles={styles.modal} visible={viewModal} animationType='slide' transparent>
              <TouchableOpacity style={styles.closeModalArea} onPress={() => setViewModal(false)} />
              <TouchableOpacity style={styles.viewModal} onPress={() => setViewModal(false)}>
                <SafeAreaView style={styles.report} onPress={() => setViewModal(false)}>
                  <TouchableOpacity style={styles.reportButton} onPressOut={() => handleCommentReport()}>
                    <Text style={styles.reportText}>Report</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </TouchableOpacity>
            </Modal>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  comment: {
    fontFamily: 'Virgil',
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
    top: 10,
    left: 15,
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
    backgroundColor: '#83C5BE',
    borderRadius: '50%',
  },
  plop: {
    backgroundColor: '#E29578',
    borderRadius: '55%',
  },
  username: {
    fontFamily: 'BubbleBold',
    color: 'rgba(49, 94, 153, 1)',
    fontSize: 16,
  },
  popCount: {
    fontFamily: 'BubbleRegular',
  },
  modal: {
    backgroundColor: 'red',
    fontFamily: 'FuzzyBubblesRegular',
    height: '100%',
    flex: 1,
    // justifyContent: 'flex-end',
  },
  viewModal: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    flex: 0.2,
    fontFamily: 'BubbleRegular',
  },
  report: {
    width: '100%',
    marginTop: 'auto',
    height: '100%',
    backgroundColor: '#EDF6F9',
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontFamily: 'FuzzyBubblesRegular',
  },
  reportButton: {
    marginTop: 10,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '4%',
    backgroundColor: '#C44536',
    borderRadius: 10,
    alignItems: 'center',
    fontFamily: 'FuzzyBubblesRegular',
  },
  reportText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FEF1E6',
    fontFamily: 'BubbleRegular',
  },
  closeModalArea: {
    flex: 0.8,
  }
});

export default Comment;
