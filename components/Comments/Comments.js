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
    copy.push(inputComment);
    const obj = { ...confession };
    obj.comments = copy;
    setConfession(obj);
  };

  return (
    <View style={styles.screen}>
      <Modal visible={showModal} transparent>
        <View style={styles.modal}>
          <SafeAreaView style={styles.report}>
            <TouchableOpacity style={styles.reportButton} onPress={() => setShowModal(false)}>
              <Text>Report</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
      {typeof confession === 'object' && (
      <FlatList
        nestedScrollEnabled
        ListHeaderComponent={<DetailedConfession setShowModal={setShowModal} />}
        keyExtractor={(comment) => comment.id}
        data={confession.comments.sort((a, b) => b.pops - a.pops)}
        // eslint-disable-next-line max-len
        renderItem={({ item }) => <Comment username={item.created_by} body={item.comment} pops={item.pops} date={item.createdAt} setShowModal={setShowModal} />}
      />
      )}
      <AddComment add={add} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DEF3FD',
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  report: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 3,
  },
  reportButton: {
    padding: '7%',
  },
});

export default Comments;