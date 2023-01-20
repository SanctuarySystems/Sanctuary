import React from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Button, Avatar, Tab, Badge, SearchBar } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SpacesList from './SpacesList';
import { UsernameContext } from '../../App';

const colorTheme = {
  beige: '#FEF1E6',
  yellow: '#F9D5A7',
  orange: '#FFB085',
  blue: '#90AACB',
};

const Profile = ({ navigation }) => {
  // const username = React.useContext(UsernameContext); // username for get user call
  const username = 'lookingforpeace'; // username for get user call
  const [currentTab, setCurrentTab] = React.useState('joined'); // joined, created
  const [userData, setUserData] = React.useState({}); // userdata to be passed down
  const [spaceData, setSpaceData] = React.useState([]); // current data for joined/created tabs
  const [created, setCreated] = React.useState([]); // created tabs to pass down to notifications
  const [searchTerm, setSearchTerm] = React.useState(''); // search term
  // revisit after notifs
  const [viewedCookies, setViewedCookies] = React.useState([]); // viewedCookies stored via async storage
  const [viewedCookieCount, setViewedCookieCount] = React.useState(0); // viewedCookieCount stored via async storage
  const [notifsCount, setNotifsCount] = React.useState(0); // # of unread notifications
  const [reportedPosts, setReportedPosts] = React.useState([]);

  const getUser = (name, cb) => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${name}`)
      .then(({ data }) => cb(data))
      .catch((err) => console.log('axios error in profile', err));
  };

  React.useEffect(() => {
    // grab user data
    getUser(username, (data) => {
      setUserData(data);
      setSpaceData(data.spaces_joined);
      setCreated(data.spaces_created);
    });

    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?&space_creator=${username}&reported=true`)
      .then(({ data }) => {
        setReportedPosts(data);
        setNotifsCount(data.length);
      })
      .catch((err) => console.log('axios error in profile for confessions', err));

    // AsyncStorage.clear();

    // grab localstorage viewedCookies for viewed notifications every 30k seconds
    refreshNotifications(setViewedCookies, setViewedCookieCount);
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
            backgroundColor: 'white',
          }}
        >
          {/* LOG OUT BUTTON */}
          <Button
            title="Log out"
            type="clear"
            titleStyle={{ color: `${colorTheme.blue}` }}
            onPress={() => navigation.navigate('Welcome Screen')}
          />

          {/* NOTIFICATIONS */}
          <Button
            title="Notifications"
            type="clear"
            titleStyle={{ color: `${colorTheme.blue}` }}
            onPress={() => navigation.navigate('Notifications', {
              username: userData.username,
              spaces: created,
              viewedCookies,
              notifsCount,
              setNotifsCount,
              reportedPosts,
              viewedCookieCount,
              setViewedCookieCount,
            })}
          />
          { notifsCount > viewedCookieCount &&
            (
              <Badge
                status="error"
                value={notifsCount}
                containerStyle={{ position: 'absolute', top: 6, right: 115 }}
              />
            )}
        </View>

        <View style={{ flexDirection: 'column', height: 220, backgroundColor: 'white' }}>
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
                containerStyle={{ boxShadow: 'none' }}
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
        <View style={{ height: 40, backgroundColor: 'white' }}>
          <Tab
            value={currentTab}
            dense
            titleStyle={{ color: `${colorTheme.blue}` }}
            buttonStyle={{ active: true }}
            // buttonStyle='View Style'
            style={{ backgroundColor: 'white', color: `${colorTheme.blue}` }}
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
              containerStyle={{ backgroundColor: 'white' }}
              inputContainerStyle={{}}
              inputStyle={{}}
              loadingProps={{}}
              onChangeText={(newVal) => setSearchTerm(newVal)}
              onClearText={() => setSearchTerm('')}
              placeholder="Search..."
              placeholderTextColor="#888"
              showCancel
              cancelButtonTitle="Cancel"
              cancelButtonProps={{ color: `${colorTheme.blue}` }}
              onCancel={() => setSearchTerm('')}
              value={searchTerm}
            />
        </View>

        <View>
          {/* SPACES */}
          <SpacesList
            colorTheme={colorTheme}
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

const getCookies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('reported');
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const getCookieCount = async () => {
  try {
    const count = await AsyncStorage.getItem('viewedCount');
    return count ? JSON.parse(count) : null;
  } catch (e) {
    console.log(e);
  }
};

// grab viewedCookies for viewed notifications every 30k seconds
const refreshNotifications = (cb1, cb2) => {
  setInterval(() => {
    const viewedCookies = getCookies()._z;
    const count = getCookieCount();
    const viewedCount = count._z || count;
    cb1(viewedCookies);
    cb2(viewedCount);

    // console.log('viewedCount', viewedCount);
    // console.log("viewedCookies", viewedCookies);
  }, 30000);
};

export default Profile;