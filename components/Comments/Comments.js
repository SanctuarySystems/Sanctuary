import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Modal, TouchableOpacity } from 'react-native';
import Comment from './Comment';
import DetailedConfession from './DetailedConfession';
import AddComment from './AddComment';

const Comments = () => {
  const [comments, setComments] = useState({
    _id: "63c709355b387cef7dae4143",
    created_by: "lookingforpeace",
    confession: "my innermost darkest secret revealed here...",
    reported: [
      "lookingforcalm",
    ],
    space_name: "tranquility",
    hugs: 0,
    comments: [
      {
        created_by: "lookingforpeace",
        comment: "the very first comment",
        reported: [
          "lookingforcalm",
        ],
        pops: 2,
        _id: "63c7093a5b387cef7dae4147",
        createdAt: "2023-01-17T20:46:51.003Z",
        updatedAt: "2023-01-18T18:42:27.896Z",
        comment_id: 1,
      },
      {
        created_by: "lookingforpeace",
        comment: "the very first comment",
        reported: [],
        pops: 0,
        _id: "63c83d907b8ffbde049e49be",
        createdAt: "2023-01-18T18:42:24.482Z",
        updatedAt: "2023-01-18T18:42:24.482Z",
        comment_id: 2,
      },
    ],
    createdAt: "2023-01-17T20:46:45.511Z",
    updatedAt: "2023-01-18T18:42:27.896Z",
    confession_id: 1,
    __v: 4,
  });

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
        ListHeaderComponent={<DetailedConfession setShowModal={setShowModal}/>}
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