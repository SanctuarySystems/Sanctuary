import React from 'react';
import { StyleSheet, TextInput, Text, ScrollView, View }  from 'react-native';
import Comment from './Comment';
import DetailedConfession from './DetailedConfession';

const Comments = () => {
  return (
    <ScrollView style={styles.commentContainer}>
      <DetailedConfession />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <TextInput defaultValue='Add a comment'/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: '#F5F5DC',
    width: '100%',
  },
});

export default Comments;