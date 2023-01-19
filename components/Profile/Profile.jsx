import React from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Button, Avatar, Tab, Badge, SearchBar } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SpacesList from './SpacesList';
import { UsernameContext } from '../../App';

const getCookies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('reported');
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

// grab cookies for viewed notifications every 30k seconds
const refreshNotifications = (cb) => {
  setInterval(() => {
    const cookies = getCookies()._z;
    cb(cookies);
    console.log("cookies", cookies);
  }, 30000);
};

const Profile = ({ navigation }) => {
  const username = React.useContext(UsernameContext); // username for get user call
  const [currentTab, setCurrentTab] = React.useState('joined'); // joined, created
  const [userData, setUserData] = React.useState({}); // userdata to be passed down
  const [spaceData, setSpaceData] = React.useState([]); // current data for joined/created tabs
  const [created, setCreated] = React.useState([]); // created tabs to pass down to notifications
  const [searchTerm, setSearchTerm] = React.useState(''); // search term

  const [cookies, setCookies] = React.useState([]); // cookies stored via async storage
  const [unreadNotifs, setUnreadNofits] = React.useState(0); // # of unread notifications
  //const [loadedNotifsNum, setLoadedNotifsNum] = React.useState(false); // passed down to notifications
  const [reportedPosts, setReportedPosts] = React.useState([]);

  React.useEffect(() => {
    // grab user data
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
      .then(({ data }) => {
        setUserData(data);
        setSpaceData(data.spaces_joined);
        setCreated(data.spaces_created);
      })
      .catch((err) => console.log('axios error in profile', err));

    // axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?createdby={}&reported=true`)
    //   .then(({ data }) => {
    //     if (data.length > 1) {
    //       setReportedPosts(data);
    //       setUnreadNofits(data.length);
    //       console.log('reportArray within notif useeffect', data);
    //     }
    //   })
    //   .catch((err) => console.log('axios error in notifications', err));

    AsyncStorage.clear();

    // grab localstorage cookies for viewed notifications every 30k seconds
    refreshNotifications(setCookies);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        // style={{ position: 1, height: '100%' }}
        stickyHeaderIndices={[3]}
        automaticallyAdjustKeyboardInsets
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            height: 50,
          }}
        >
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
              username: userData.username,
              spaces: created,
              cookies,
              unreadNotifs,
              setUnreadNofits,
              // loadedNotifsNum,
              // setLoadedNotifsNum,
            })}
          />
          { unreadNotifs > 0 &&
            (
              <Badge
                status="error"
                value={unreadNotifs}
                containerStyle={{ position: 'absolute', top: 6, right: 115 }}
              />
            )}
        </View>

        <View style={{ flexDirection: 'column', height: 220 }}>
          <View style={{ flex: 0.7 }}>
            {/* AVATAR */}
            <Avatar
              size={100}
              rounded
              containerStyle={{ position: 'absolute', top: '25%', right: '38%' }}
              source={{ uri: userData.avatar }}
            >
              {/* EDIT AVATAR */}
              <Avatar.Accessory
                size={24}
                onPress={() => console.log('editing avatar') || navigation.navigate('Select Icon Screen')}
              />
            </Avatar>
          </View>

          {/* USERNAME */}
          <Text style={{ flex: 0.3, alignSelf: 'center', fontSize: 20, fontWeight: 'bold', top: 15 }}>
            {userData.username}
          </Text>
        </View>

        {/* TABS */}
        <View style={{ height: 50 }}>
          <Tab
            value={currentTab}
            dense
            buttonStyle='View Style'
            style={{ backgroundColor: 'white' }}
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
        </View>

        <View>
          <SearchBar
            platform="ios"
            containerStyle={{}}
            inputContainerStyle={{}}
            inputStyle={{}}
            loadingProps={{}}
            onChangeText={(newVal) => setSearchTerm(newVal)}
            onClearText={() => setSearchTerm('')}
            placeholder="Search..."
            placeholderTextColor="#888"
            showCancel
            cancelButtonTitle="Cancel"
            cancelButtonProps={{}}
            onCancel={() => setSearchTerm('')}
            value={searchTerm}
          />
        </View>

        <View>
          {/* SPACES */}
          <SpacesList
            searchTerm={searchTerm}
            currentTab={currentTab}
            spaceArray={spaceData}
            currentUser={userData.username}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;