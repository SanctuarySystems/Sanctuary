/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import Comment from './Comment';
import DetailedConfession from './DetailedConfession';
import AddComment from './AddComment';
import { UsernameContext, apiUrl } from '../../App.js';
import { useFonts } from 'expo-font';
import moment from 'moment';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

const Comments = ({ route }) => {
  const { confession_id, item, image } = route.params;
  const { username, userToken } = useContext(UsernameContext);
  const [confession, setConfession] = useState();

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    BubbleBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
    BubbleRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
  });

  useEffect(() => {
    axios.get(`${apiUrl}/confessions/${confession_id}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        setConfession(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const [showModal, setShowModal] = useState(false);

  const add = (inputComment) => {
    const copy = [...confession.comments];
    const inputCopy = { ...inputComment, comment_id: confession.comments.length + 1, reported: [] };
    copy.push(inputCopy);
    const obj = { ...confession };
    obj.comments = copy;
    setConfession(obj);
  };

  const handleReport = () => {
    setShowModal(false);
    axios.patch(`${apiUrl}/confessions/${confession_id}/report/${username}`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .catch((error) => console.log(error));
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>

      <Modal styles={styles.modal} visible={showModal} animationType='slide' transparent>
        <TouchableOpacity style={styles.closeModalArea} onPress={() => setShowModal(false)} />
        <TouchableOpacity style={styles.viewModal} onPress={() => setShowModal(false)}>
          <SafeAreaView style={styles.report} onPress={() => setShowModal(false)}>
            <TouchableOpacity style={styles.reportButton} onPressOut={() => handleReport()}>
              <Text style={styles.reportText}>Report</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
      {typeof confession === 'object' && (
      <>
        <FlatList
          nestedScrollEnabled
          ListHeaderComponent={(
            <View style={styles.containerConfess}>
              <View style={styles.containerPost}>
                <View style={styles.roomDateContainer}>
                  <View style={{ width: '90%', flexDirection: 'row' }}>
                    <Text style={styles.roomNameStyle}
                      onPress={() => spaceNav(item.space_name, item.space_creator)}
                    >
                      {item.space_name + ' '}
                    </Text>
                    <Text style={styles.dateStyle}>{moment(item.createdAt).fromNow()}</Text>
                  </View>
                  <View style={{ width: '10%' }} onPress={() => setShowModal(true)} >
                    <Entypo name="dots-three-horizontal" size={20} color="black" onPress={() => setShowModal(true)} />
                  </View>
                </View>

                <View style={styles.imgUserContainer}>
                  <Image source={image} style={styles.image}/>
                  <Text style={styles.textStyle}>{'  ' + item.created_by}</Text>
                </View>
                <Text style={styles.bodyText}>{item.confession}</Text>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonStyleHug}>
                    <View>
                      <Text style={{ textAlign: 'center', color: '#90AACB' }}><FontAwesome5 name="hands-helping" size={20} color="#90AACB" />{' ' + (item.hugs + 1)}</Text>
                      <Text style={{ fontFamily: 'BubbleRegular', color: '#90AACB' }}>Hugs</Text>
                    </View>
                  </View>
                  <View style={styles.buttonStyleComment}>
                    <TouchableOpacity>
                      <Text style={{ textAlign: 'center' }}>
                        <FontAwesome5 name="comments" size={20} color="rgba(27, 52, 83, 1)" />
                        {' ' + item.comments.length}
                      </Text>
                      <Text style={{ fontFamily: 'BubbleRegular' }}>Comments</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(comment) => comment.id}
          data={(confession.comments || []).sort((a, b) => b.pops - a.pops)}
          renderItem={({ item: comment }) => (
            <Comment
              currentUser={username}
              username={comment.created_by}
              body={comment.comment}
              pops={comment.pops}
              date={comment.createdAt}
              confessionId={confession.confession_id}
              commentId={comment.comment_id}
              userVoteStatus={comment.userVoteStatus}
            />
          )}
        />
        <AddComment add={add} username={username} confessionId={confession_id} />
      </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FEF1E6',
    fontFamily: 'BubbleRegular',
  },
  modal: {
    backgroundColor: 'red',
    fontFamily: 'BubbleRegular',
    flex: 1,
    height: '100%',
  },
  viewModal: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    height: '100%',
    fontFamily: 'BubbleRegular',
    flex: 0.2,
  },
  report: {
    width: '100%',
    marginTop: 'auto',
    height: '100%',
    backgroundColor: '#EDF6F9',
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontFamily: 'BubbleRegular',
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
    fontFamily: 'BubbleRegular',
  },
  closeModalArea: {
    flex: 0.8,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(254, 241 , 230, .8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    fontFamily: 'BubbleRegular'
  },

  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(27, 52, 83, 1)',

  },
  containerConfess: {
    borderWidth: 0,
    // backgroundColor: 'rgba(144, 170 , 203, .2)',
    backgroundColor: 'rgba(255, 255, 255, .85)',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(27, 52, 83, .08)',
    marginTop: '1.5%',
    marginBottom: '1.5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },

  containerPost: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    paddingTop: '2%',
    fontFamily: 'BubbleRegular',
  },

  roomDateContainer: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(27, 52, 83, .08)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontFamily: 'BubbleRegular',

  },
  imgUserContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    //  backgroundColor: 'rgba(27, 52, 83, .08)',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    fontFamily: 'BubbleRegular',
  },
  image: {
    width: 20,
    height: 20,
  },
  buttonStyleHug: {
    borderWidth: 0,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(27, 52, 83, .1)',
    paddingTop: '1%',
    fontFamily: 'BubbleRegular',
  },

  buttonStyleComment: {
    borderWidth: 0,
    width: '50%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(27, 52, 83, .1)',
    paddingTop: '1%',
    fontFamily: 'BubbleRegular',
  },

  roomNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(27, 52, 83, 1)',
    fontFamily: 'BubbleRegular',
  },

  textStyle: {
    fontSize: 16,
    paddingBottom: 8,
    color: 'rgba(27, 52, 83, 1)',
    fontFamily: 'BubbleRegular',
  },

  dateStyle: {
    fontStyle: 'italic',
    fontSize: 12,
    paddingTop: '1%',
    color: 'rgba(49, 94, 153, 1)',
    fontFamily: 'BubbleRegular'
  },
  bodyText: {
    color: 'rgba(49, 94, 153, 1)',
    fontSize: 18,
    padding: '3%',
    fontFamily: 'BubbleRegular',
  },
  reportText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Comments;