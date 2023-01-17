import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Modal, TouchableOpacity } from 'react-native';
import Comment from './Comment';
import DetailedConfession from './DetailedConfession';
import AddComment from './AddComment';

const Comments = () => {
  const [comments, setComments] = useState([
    { username: 'notMax', body: `I'm a comment1`, pops: 3, id: 1 },
    { username: 'notChad', body: `I'm a comment2`, pops: 4, id: 2 },
    { username: 'notKimberly', body: `I'm a comment3`, pops: 6, id: 3 },
    { username: 'notWarren', body: `I'm a comment4`, pops: 4, id: 4 },
    { username: 'notSai', body: `I'm a comment5`, pops: 10, id: 5 },
    { username: 'notJoseph', body: `I'm a comment6`, pops: 7, id: 6 },
    { username: 'notJustin', body: `I'm a comment7`, pops: 1, id: 7 },
  ]);

  const [showModal, setShowModal] = useState(false);

  const add = (comment) => {
    const copy = [...comments];
    const obj = { ...comment };
    obj.id = copy.length + 1;
    copy.push(comment);
    setComments(copy);
  };

  return (
    <View style={styles.screen}>
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modal}>
          <SafeAreaView style={styles.report}>
            <TouchableOpacity style={styles.reportButton} onPress={() => setShowModal(false)}>
              <Text>Report</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
      <FlatList
        nestedScrollEnabled
        ListHeaderComponent={<DetailedConfession />}
        keyExtractor={(comment) => comment.id}
        data={comments.sort((a, b) => b.pops - a.pops)}
        renderItem={({ item }) =>
          <Comment username={item.username} body={item.body} pops={item.pops} setShowModal={setShowModal}/>
        }
      />
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