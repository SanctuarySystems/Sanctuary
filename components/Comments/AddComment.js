import React, { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Keyboard } from 'react-native';
import axios from 'axios';

const AddComment = ({ add, username, confessionId }) => {
  const [comment, setComment] = useState({ created_by: username, pops: 1, comment: '' });

  const handlePress = () => {
    if (comment.comment.length !== 0) {
      const copy = { ...comment, createdAt: new Date().toISOString() };
      add(copy);
      setComment({ created_by: 'lookingforpeace', pops: 1, comment: '' });
      Keyboard.dismiss();
    }

    axios.post('http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/comments', {
      confession_id: confessionId,
      created_by: username,
      comment: comment.comment,
    });
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={100}>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          multiline
          value={comment.comment}
          onChangeText={(text) => setComment({ ...comment, comment: text })}
          placeholder='Add a comment...'
        />
        <TouchableOpacity onPress={handlePress} style={styles.addButton}>
          <Text>POST</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b90f5',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2%',
    marginBottom: '2%',
    borderWidth: 1,
    borderRadius: '15%',
    backgroundColor: 'white',
  },
  addButton: {
    alignItems: 'center',
    padding: 3,
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    flex: 5,
  },
});

export default AddComment;