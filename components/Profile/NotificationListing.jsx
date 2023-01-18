import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';

const NotificationListing = ({ item }) => {
  return (
    <View style={{ borderWidth: 1, borderRadius: 15, padding: 10 }}>
      {/* <Text>
        {item.reporter}'s comment in {item.space} reported by {item.reportee}
      </Text> */}
      <Text>
        lookingforpeace's post in Serenity has been reported by peacelover
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
          onPress={() => console.log('View Post')}
        />
      </View>
    </View>
  );
};

export default NotificationListing;