import React from 'react';
import { Button, Text, View } from 'react-native';
import axios from 'axios';

const SpacesListing = ({ space, currentUser, navigation }) => {
  const [spaceData, setSpaceData] = React.useState({});

  console.log('space', space);

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces?space_name=${space}`)
      .then(({ data }) => {
        setSpaceData(data[0]);
        console.log('space data from spaceslisting:', data[0]);
      })
      .catch((err) => console.log('err from spaceslisting', err));
  }, [space]);

  return (
    <View style={{ flexDirection: 'row', alignContent: 'space-between', align: 'center', borderWidth: 1, borderRadius: 15, padding: 10 }}>
      <View style={{ flexDirection: 'column' }}>
        <Text>{spaceData.space_name}</Text>
        <Text>{spaceData.members.length} members</Text>
        { spaceData.created_by === currentUser && <Text>admin!</Text> }
      </View>

      <Button
        title="View Space"
        onPress={() => console.log('lead to space') ||
          navigation.navigate('Space', { space_name: spaceData.space_name })
        }
      />
    </View>
  );
};

export default SpacesListing;