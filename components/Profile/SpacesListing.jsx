import React from 'react';
import { Button, Text, View } from 'react-native';
import axios from 'axios';

const SpacesListing = ({ colorTheme, space, currentUser, navigation }) => {
  const [spaceData, setSpaceData] = React.useState({});

  React.useEffect(() => {
    // console.log('space being called via endpoint', space);
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces?space_name=${space}`)
      .then(({ data }) => {
        setSpaceData(data[0]);
        // console.log(spaceData);
      })
      .catch((err) => console.log('err from spaceslisting', err));
  }, []);

  if (Object.keys(spaceData).length === 0) return;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: `${colorTheme.yellow}`
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{spaceData.space_name}</Text>
          <Text>
            {spaceData.members.length} members
          </Text>
        </View>
        <View>
          { spaceData.created_by === currentUser &&
            <Text style={{ left: 5, color: `${colorTheme.orange}` }}>admin</Text>
            }
        </View>
      </View>

      <View>
        <Button
          color={`${colorTheme.blue}`}
          title="View Space"
          onPress={() => console.log('lead to space') ||
            navigation.navigate('Space', {
              space_name: spaceData.space_name,
              isAdmin: spaceData.created_by === currentUser,
            })}
        />
      </View>
    </View>
  );
};

export default SpacesListing;