import React from 'react';
import { Button, View, Text } from 'react-native';
import NotificationListing from './NotificationListing';

const Notifications = () => {
  return (
    <View style={{ padding: 10 }}>
      {/* <Text>this is the notif page</Text> */}
      <NotificationListing />
    </View>
  );
};

export default Notifications;