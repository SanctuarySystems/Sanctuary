import React from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView } from 'react-native';
import HugCount from './HugCount';

const Comment = () => {

  return (
    <View style={styles.comment}>
      <Text>I'm a comment</Text>
      <HugCount />
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    backgroundColor: '#FAF9F6',
    borderRadius: 5,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15%',
    width: '80%',
    marginBottom: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Comment;
