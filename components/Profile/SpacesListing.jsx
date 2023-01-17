import React from 'react';
import { Button, Text, View } from 'react-native';
import axios from 'axios';

const SpacesListing = ({ space, currentUser }) => {
  const [spaceData, setSpaceData] = React.useState({});

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces/${space}`)
      .then(({ data }) => {
        setSpaceData(data);
      })
      .catch((err) => console.log(err));
  }, [space]);

  return (
    <View>
      <Text>{space}</Text>
      <Text>
        {spaceData.members.length}
        members
      </Text>
      { space.created_by === currentUser && <Text>admin!</Text> }
      <Button
        title="View Space"
        onPress={() => console.log('lead to space')}
      />
    </View>
  );
};

export default SpacesListing;