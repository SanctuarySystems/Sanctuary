import React from 'react';
import { View } from 'react-native';
import NotificationListing from './NotificationListing';

const Notifications = () => {
  return (
    <View style={{ padding: 10 }}>
      <NotificationListing />
    </View>
  );
};

export default Notifications;