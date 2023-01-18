import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';

// reported={comment.created_By}
//                   reportedBy={comment.reported[0]}
//                   spaceName={confession.space_name}
//                   commentId={comment.comment_id}
//                   confessionId={confession.confession_id}

const NotificationListing = ({ reported, reportedBy, spaceName, commentId, confessionId, navigation }) => {
  return (
    <View style={{ borderWidth: 1, borderRadius: 15, padding: 10 }}>
      <Text>
        {reported}'s comment in {spaceName} has been reported by {reportedBy}.
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-evenly' }}>
        <Button
          buttonStyle={{ borderRadius: 30 }}
          title="Ban Reporter"
          type="outline"
          onPress={() => console.log('Banning reporter')}
        />
        <Button
          buttonStyle={{ borderRadius: 30 }}
          title="View Post"
          onPress={() => navigation.navigate('Comments', {
            confession_id: confessionId,
            comment_id: commentId,
          })}
        />
      </View>
    </View>
  );
};

export default NotificationListing;