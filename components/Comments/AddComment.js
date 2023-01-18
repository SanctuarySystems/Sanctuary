import React, { useState } from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Keyboard } from 'react-native';

const AddComment = ({ add }) => {
  const [comment, setComment] = useState({ username: 'testuser', pops: 1, body: '' });

  const handlePress = () => {
    if (comment.body.length !== 0) {
      add(comment);
      const copy = { ...comment };
      copy.body = '';
      setComment(copy);
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <TextInput
        multiline
        value={comment.body}
        onChangeText={(text) => setComment({ ...comment, body: text })}
        style={styles.input}
        placeholder='Add a comment...'
      />
      <TouchableOpacity onPress={handlePress} style={styles.addButton}>
        <Text>Add comment</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b90f5',
  },
  input: {
    width: '90%',
    padding: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2%',
    borderWidth: 2,
    borderRadius: '15%',
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: 'white',
    marginTop: '2%',
    marginBottom: '2%',
    width: '30%',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderRadius: '15%',
    padding: 3,
  },
});

export default AddComment;