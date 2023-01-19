import React, { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Keyboard } from 'react-native';
import axios from 'axios';

const AddComment = ({ add }) => {
  const [comment, setComment] = useState({ created_by: 'lookingforpeace', pops: 1, comment: '' });

  const handlePress = () => {
    if (comment.comment.length !== 0) {
      const copy = { ...comment, createdAt: new Date().toISOString() };
      add(copy);
      setComment({ created_by: 'lookingforpeace', pops: 1, comment: '' });
      Keyboard.dismiss();
    }

    axios.post('http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/comments', {
      confession_id: 1,
      created_by: 'lookingforcalm',
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
    width: '90%',
    padding: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2%',
    marginBottom: '2%',
    borderWidth: 2,
    borderRadius: '15%',
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: 'white',
    width: '30%',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: '15%',
    padding: 3,
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    flex: 4,
  },
});

export default AddComment;