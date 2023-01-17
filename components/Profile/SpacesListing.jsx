import React from 'react';
import { Button, Text, View } from 'react-native';

const SpacesListing = ({ space }) => {
  return (
    <View>
      <Text>{space.name}</Text>
      <Text>{space.member_count}</Text>
      { space.admin && <Text>admin</Text> }
      <Button
        title="View Space"
        onPress={() => console.log('lead to space')}
      />
    </View>
  );
};

export default SpacesListing;