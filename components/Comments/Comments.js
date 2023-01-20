/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Modal, TouchableOpacity } from 'react-native';
import Comment from './Comment';
import DetailedConfession from './DetailedConfession';
import AddComment from './AddComment';

const Comments = () => {
  const [confession, setConfession] = useState();

  useEffect(() => {
    axios.get('http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions')
      .then((res) => {
        setConfession(res.data[0]);
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

  return (
    <View style={styles.screen}>
      <Modal styles={styles.modal} visible={showModal} animationType='slide' transparent>
        <TouchableOpacity style={styles.viewModal} onPress={() => setShowModal(false)}>
          <SafeAreaView style={styles.report} onPress={() => setShowModal(false)}>
            <TouchableOpacity style={styles.reportButton} onPressOut={() => setShowModal(false)} onPress={() => setShowModal(false)}>
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
          renderItem={({ item }) => <Comment username={item.created_by} body={item.comment} pops={item.pops} date={item.createdAt} setShowModal={setShowModal} confessionId={confession.confession_id} commentId={item.comment_id} />}
        />
        <AddComment add={add} />
      </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
  },
  modal: {
    backgroundColor: 'red',
  },
  viewModal: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    height: '100%',
  },
  report: {
    width: '100%',
    marginTop: 'auto',
    height: '20%',
    backgroundColor: 'white',
    borderWidth: 2,
  },
  reportButton: {
    marginTop: 10,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '7%',
    borderWidth: 1,
  },
});

export default Comments;