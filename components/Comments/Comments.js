/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Modal, TouchableOpacity } from 'react-native';
import Comment from './Comment';
import DetailedConfession from './DetailedConfession';
import AddComment from './AddComment';
import { UsernameContext } from '../../App.js';
import { useFonts } from 'expo-font';

const Comments = ({ route }) => {
  const { confession_id, } = route.params;
  const { username } = useContext(UsernameContext);
  const [confession, setConfession] = useState();

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
  });

  useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/${confession_id}`)
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
    axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions/1/2/report/${username}`)
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
        <TouchableOpacity style={styles.viewModal} onPress={() => setShowModal(false)}>
          <SafeAreaView style={styles.report} onPress={() => setShowModal(false)}>
            <TouchableOpacity style={styles.reportButton} onPressOut={() => handleReport()}>
              <Text>Report</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
      {typeof confession === 'object' && (
      <>
        <FlatList
          nestedScrollEnabled
          ListHeaderComponent={<DetailedConfession username={confession.created_by} date={confession.createdAt} space={confession.space_name} body={confession.confession} setShowModal={setShowModal} />}
          keyExtractor={(comment) => comment.id}
          data={confession.comments.sort((a, b) => b.pops - a.pops)}
          renderItem={({ item }) => <Comment handleReport={handleReport} username={item.created_by} body={item.comment} pops={item.pops} date={item.createdAt} setShowModal={setShowModal} confessionId={confession.confession_id} commentId={item.comment_id} />}
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
    fontFamily: 'Virgil',
  },
  modal: {
    backgroundColor: 'red',
  },
  viewModal: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    height: '100%',
    fontFamily: 'Virgil',
  },
  report: {
    width: '100%',
    marginTop: 'auto',
    height: '20%',
    backgroundColor: '#EDF6F9',
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontFamily: 'Virgil',
  },
  reportButton: {
    marginTop: 10,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '7%',
    backgroundColor: '#FFCCCB',
    borderRadius: 10,
    alignItems: 'center',
    fontFamily: 'Virgil',
  },
});

export default Comments;