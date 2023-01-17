import React from 'react';
import { Button, Text, View } from 'react-native';
import SpacesList from './SpacesList';
import axios from 'axios';

const mockData = {
  username: 'lookingforpeace',
};

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
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <View>
        <View style={{ height: '40%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* LOG OUT BUTTON */}
            <Button
              style={{ flex: 1 }}
              title="Log out"
              onPress={() => console.log('Logged Out')}
            />

            {/* NOTIFICATIONS */}
            <Button
              style={{ flex: 1 }}
              title="Notifications"
              onPress={() => navigation.navigate('Notifications')}
            />
          </View>

          <View style={{ flexDirection: 'column', height: '90%' }}>
            <View>
              {/* AVATAR */}
              <Text>avatar img</Text>
              {/* EDIT AVATAR */}
              <Button
                title="Edit"
                onPress={() => console.log('editing avatar')}
              />
            </View>
            {/* USERNAME */}
            <Text>{userData.username}</Text>
          </View>
        </View>
      </View>

      {/* TABS */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button
          title="Joined Spaces"
          onPress={() => {
            console.log('showing joined') || setCurrentTab('joined');
            console.log('showing joined') || setSpaceData(userData.spaces_joined);
          }}
        />
        <Button
          title="Created Spaces"
          onPress={() => {
            console.log('showing created') || setCurrentTab('created');
            console.log('showing created') || setSpaceData(userData.spaces_created);
          }}
        />
      </View>
      {/* SPACES */}
      <SpacesList currentTab={currentTab} spaceData={spaceData} currentUser={userData.username} />
    </View>
  );
};

export default Profile;