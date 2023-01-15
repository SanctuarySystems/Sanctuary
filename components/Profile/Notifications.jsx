import React from 'react';
import { Button, View, Text } from 'react-native';

const Notifications = () => {
  return (
    <View>
      <Button
        // styles={styles.align_right}
        title="Back"
        onPress={() => console.log('Exiting Notifs')}
      />
      <Text>this is the notif page</Text>
    </View>
  )
};

export default Notifications;