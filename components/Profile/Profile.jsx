import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Avatar, Tab, Badge } from '@rneui/themed';
import axios from 'axios';
import SpacesList from './SpacesList';

const mockData = {
  username: 'lookingforpeace',
};

console.log('merging conflicts');

const Profile = ({ navigation }) => {
  const [currentTab, setCurrentTab] = React.useState('joined'); // joined, created
  const [userData, setUserData] = React.useState({});
  const [spaceData, setSpaceData] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${mockData.username}`)
      .then(({ data }) => {
        setUserData(data);
        setSpaceData(data.spaces_joined);
      })
      .catch((err) => console.log('axios error in profile', err));
  }, []);

  return (
    <ScrollView
      style={{ position: 1 }}
      stickyHeaderIndices={[1]}
    >
      <View>
        <View style={{ height: '120%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, height: '20%' }}>
            {/* LOG OUT BUTTON */}
            <Button
              title="Log out"
              type="clear"
              onPress={() => navigation.navigate('Welcome Screen')}
            />

            {/* NOTIFICATIONS */}
            <Button
              title="Notifications"
              type="clear"
              onPress={() => navigation.navigate('Notifications')}
            />
            <Badge
              status="error"
              value={10}
              containerStyle={{ position: 'absolute', top: 6, right: 115 }}
            />
          </View>

          <View style={{ flexDirection: 'column', height: '60%' }}>
            <View style={{ flex: 1, alignContent: 'center' }}>
              {/* AVATAR */}
              <Avatar
                size={100}
                rounded
                containerStyle={{ position: 'absolute', top: '25%', right: '38%' }}
                source={{ uri: userData.avatar }}
              />
              {/* EDIT AVATAR */}
              <Avatar
                size={25}
                rounded
                containerStyle={{ position: 'absolute', top: '24%', right: '37%' }}
                source={{ uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg' }}
                onPress={() => console.log('editing avatar')}
              />
            </View>
            {/* USERNAME */}
            <Text
              style={{ flex: 0.2, alignSelf: 'center', top: '10%' }}
            >
              {userData.username}
            </Text>
          </View>
        </View>
      </View>

      {/* TABS */}
      <View>
        {/* style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}> */}
        <Tab
          value={currentTab}
          dense
          buttonStyle='View Style'
          onChange={(e) => {
            if (!e) {
              console.log('showing joined');
              setCurrentTab('joined');
              setSpaceData(userData.spaces_joined);
            } else {
              console.log('showing created');
              setCurrentTab('created');
              setSpaceData(userData.spaces_created);
            }
          }}
        >
          <Tab.Item title='Joined Spaces' />
          <Tab.Item title='Created Spaces' />
        </Tab>

        {/* SPACES */}
        <SpacesList
          currentTab={currentTab}
          spaceArray={spaceData}
          currentUser={userData.username}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;