import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, ScrollView }  from 'react-native';
import Comment from './Comment';
import DetailedConfession from './DetailedConfession';

const Comments = () => {
  const [comments, setComments] = useState([
    {username: 'notMax', body: `I'm a comment1`, pops: 3},
    {username: 'notChad', body: `I'm a comment2`, pops: 4},
    {username: 'notKimberly', body: `I'm a comment3`, pops: 6},
    {username: 'notWarren', body: `I'm a comment4`, pops: 4},
    {username: 'notSai', body: `I'm a comment5`, pops: 10},
    {username: 'notJoseph', body: `I'm a comment6`, pops: 7},
    {username: 'notJustin', body: `I'm a comment7`, pops: 1},
  ]);

  return (
    <ScrollView style={styles.commentContainer}>
      <DetailedConfession />
      {comments.sort((a, b) => b.pops - a.pops).map((comment, index) => <Comment username={comment.username} pops={comment.pops} body-={comment.body} key={index}/>)}
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