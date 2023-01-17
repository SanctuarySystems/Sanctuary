import React, { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text, Keyboard } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const AddComment = ({ add }) => {

  const [comment, setComment] = useState({username: 'testuser', pops: 1, body: ''});

  const handlePress = () => {
    if (comment.body.length !== 0) {
      add(comment);
      const copy = {...comment};
      copy.body = '';
      setComment(copy);
      Keyboard.dismiss();
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <TextInput
        multiline
        value={comment.body}
        onChangeText={text => setComment({...comment, body: text})}
        style={styles.input}
        placeholder='Add a comment...'
        />
      <TouchableOpacity onPress={handlePress} style={styles.addButton}>
        <Text>Add comment</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b90f5',
  },
  input: {
    width: '90%',
    padding: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '7%',
    borderWidth: 2,
    borderRadius: '15%',
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: 'white',
    marginTop: '4%',
    marginBottom: '8%',
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