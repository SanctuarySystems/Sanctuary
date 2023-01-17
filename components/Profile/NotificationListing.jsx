import React from 'react';
import { Button, View, Text } from 'react-native';

const NotificationListing = ({ item }) => {
  console.log(item.reporter);
  return (
    <View>
      <Text>
        {item.reporter}'s comment in {item.space} reported by {item.reportee}
      </Text>
      <Button
        // styles={styles.align_right}
        title="Ban Reporter"
        onPress={() => console.log('Banning reporter')}
      />
      <Button
        // styles={styles.align_right}
        title="View Comment"
        onPress={() => console.log('View Comment')}
      />
    </View>
  );
};

export default NotificationListing;