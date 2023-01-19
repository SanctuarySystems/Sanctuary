import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Avatar, Tab, Badge } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SpacesList from './SpacesList';

const mockData = {
  username: 'lookingforpeace',
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('reported');
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const Profile = ({ navigation }) => {
  const [currentTab, setCurrentTab] = React.useState('joined'); // joined, created
  const [userData, setUserData] = React.useState({});
  const [spaceData, setSpaceData] = React.useState([]);
  const [created, setCreated] = React.useState([]);
  const [reportedCookie, setReportedCookie] = React.useState([]);
  const [unreadNotifs, setUnreadNofits] = React.useState(0);

  React.useEffect(() => {
    // grab user data
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${mockData.username}`)
      .then(({ data }) => {
        setUserData(data);
        setSpaceData(data.spaces_joined);
        setCreated(data.spaces_created);
      })
      .catch((err) => console.log('axios error in profile', err));

    AsyncStorage.clear();

    // grab localstorage cookies for viewed notifications every 30k seconds
    setInterval(() => {
      setReportedCookie(getData());
      console.log("reportedCookie", reportedCookie._z);
    }, 30000);
  }, []);

  return (
    <ScrollView
      // style={{ position: 1 }}
      // stickyHeaderIndices={[2]}
    >
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, height: '18%' }}>
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
            onPress={() => navigation.navigate('Notifications', {
              spaces: created,
              reportedCookie: reportedCookie,
              unreadNotifs: unreadNotifs,
              setUnreadNofits: setUnreadNofits,
            })}
          />
          { unreadNotifs > 0 &&
            <Badge
              status="error"
              value={unreadNotifs}
              containerStyle={{ position: 'absolute', top: 6, right: 115 }}
            /> }
        </View>

        <View style={{ flexDirection: 'column', height: '70%' }}>
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
              onPress={() => console.log('editing avatar') || navigation.navigate('Select Icon Screen')}
            />
          </View>
          {/* USERNAME */}
          <Text style={{ flex: 0.2, alignSelf: 'center', top: '1%' }}>
            {userData.username}
          </Text>
        </View>

        {/* TABS */}
        <View style={{ height: '20%' }}>
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
      </View>
    </ScrollView>
  );
};

export default Profile;