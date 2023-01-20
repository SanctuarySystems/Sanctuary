import React from 'react';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, Animated, Image, Item } from 'react-native';
import { Button, Avatar, Tab, Badge, SearchBar, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SpacesList from './SpacesList';
import { UsernameContext } from '../../App';

const images = [
  { id: 1, img: require(`../../assets/avatars/001.png`), animate: new Animated.Value(0) },
  { id: 2, img: require(`../../assets/avatars/002.png`), animate: new Animated.Value(0) },
  { id: 3, img: require(`../../assets/avatars/003.png`), animate: new Animated.Value(0) },
  { id: 4, img: require(`../../assets/avatars/004.png`), animate: new Animated.Value(0) },
  { id: 5, img: require(`../../assets/avatars/005.png`), animate: new Animated.Value(0) },
  { id: 6, img: require(`../../assets/avatars/006.png`), animate: new Animated.Value(0) },
  { id: 7, img: require(`../../assets/avatars/007.png`), animate: new Animated.Value(0) },
  { id: 8, img: require(`../../assets/avatars/008.png`), animate: new Animated.Value(0) },
  { id: 9, img: require(`../../assets/avatars/009.png`), animate: new Animated.Value(0) },
  { id: 10, img: require(`../../assets/avatars/010.png`), animate: new Animated.Value(0) },
  { id: 11, img: require(`../../assets/avatars/011.png`), animate: new Animated.Value(0) },
  { id: 12, img: require(`../../assets/avatars/012.png`), animate: new Animated.Value(0) },
  { id: 13, img: require(`../../assets/avatars/013.png`), animate: new Animated.Value(0) },
  { id: 14, img: require(`../../assets/avatars/014.png`), animate: new Animated.Value(0) },
  { id: 15, img: require(`../../assets/avatars/015.png`), animate: new Animated.Value(0) },
  { id: 16, img: require(`../../assets/avatars/016.png`), animate: new Animated.Value(0) },
  { id: 17, img: require(`../../assets/avatars/017.png`), animate: new Animated.Value(0) },
  { id: 18, img: require(`../../assets/avatars/018.png`), animate: new Animated.Value(0) },
  { id: 19, img: require(`../../assets/avatars/019.png`), animate: new Animated.Value(0) },
  { id: 20, img: require(`../../assets/avatars/020.png`), animate: new Animated.Value(0) },
  { id: 21, img: require(`../../assets/avatars/021.png`), animate: new Animated.Value(0) },
  { id: 22, img: require(`../../assets/avatars/022.png`), animate: new Animated.Value(0) },
  { id: 23, img: require(`../../assets/avatars/023.png`), animate: new Animated.Value(0) },
  { id: 24, img: require(`../../assets/avatars/024.png`), animate: new Animated.Value(0) },
  { id: 25, img: require(`../../assets/avatars/025.png`), animate: new Animated.Value(0) },
  { id: 26, img: require(`../../assets/avatars/026.png`), animate: new Animated.Value(0) },
  { id: 27, img: require(`../../assets/avatars/027.png`), animate: new Animated.Value(0) },
  { id: 28, img: require(`../../assets/avatars/028.png`), animate: new Animated.Value(0) },
  { id: 29, img: require(`../../assets/avatars/029.png`), animate: new Animated.Value(0) },
  { id: 30, img: require(`../../assets/avatars/030.png`), animate: new Animated.Value(0) },
  { id: 31, img: require(`../../assets/avatars/031.png`), animate: new Animated.Value(0) },
  { id: 32, img: require(`../../assets/avatars/032.png`), animate: new Animated.Value(0) },
  { id: 33, img: require(`../../assets/avatars/033.png`), animate: new Animated.Value(0) },
];

const Profile = ({ navigation }) => {
  const { username } = React.useContext(UsernameContext); // username for get user call
  const [currentTab, setCurrentTab] = React.useState('joined'); // joined, created
  const [userData, setUserData] = React.useState({}); // userdata to be passed down
  const [spaceData, setSpaceData] = React.useState([]); // current data for joined/created tabs
  const [created, setCreated] = React.useState([]); // created tabs to pass down to notifications
  const [searchTerm, setSearchTerm] = React.useState(''); // search term
  const [reportedPosts, setReportedPosts] = React.useState([]); // reportedPosts from confessions endpoint
  const [notifsCount, setNotifsCount] = React.useState(null); // # of unread notifications
  const [viewedCookies, setViewedCookies] = React.useState([]); // viewedCookies stored via async storage
  const [viewedCookieCount, setViewedCookieCount] = React.useState(null); // viewedCookieCount stored via async storage

  let refreshNotifications;
  // let avatarId;

  if (!username) return;

  React.useEffect(() => {
    // grab user data
    getUser(username, (data) => {
      setUserData(data);
      setSpaceData(data.spaces_joined);
      setCreated(data.spaces_created);
      // avatarId = data.avatar < 10 ? Number(data.avatar.slice(1)) : data.avatar;
      // console.log('i am avatar id', avatarId);
      // console.log('image at id', images[avatarId]);
      // console.log('image at 1', images[1]);
    });

    getConfessions(username, (data) => {
      setReportedPosts(data);
      setNotifsCount(data.length);
      console.log('found reported');
    });

    // initialize and set cookies for notifications every 30k seconds
    // initializeCookies();
    refreshCookies();
  }, []);

  React.useEffect(() => {
    clearInterval(refreshNotifications);
    refreshCookies();
  }, [viewedCookieCount]);

  // grab viewedCookies for viewed notifications every 30k seconds
  const refreshCookies = () => {
    refreshNotifications = setInterval(() => {
      getCookies(setViewedCookies);
      getCookieCount(setViewedCookieCount);
    }, 30000);
  };

  if (!userData) return;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        stickyHeaderIndices={[3]}
        automaticallyAdjustKeyboardInsets
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            height: 50,
            backgroundColor: `${colorTheme.beige}`,
          }}
        >
          {/* LOG OUT BUTTON */}
          <Button
            title="Log out"
            type="clear"
            titleStyle={{ color: `${colorTheme.blue}`, fontWeight: 'bold' }}
            onPress={() => navigation.navigate('Welcome Screen')}
          />

          {/* NOTIFICATIONS */}
          <Button
            title="Notifications"
            type="clear"
            titleStyle={{ color: `${colorTheme.blue}`, fontWeight: 'bold' }}
            onPress={() => navigation.navigate('Notifications', {
              username: userData.username,
              viewedCookies,
              notifsCount,
              setNotifsCount,
              reportedPosts,
              viewedCookieCount,
              setViewedCookieCount,
            })}
          />
          {notifsCount > viewedCookieCount &&
            (
              <Badge
                status="error"
                value={notifsCount}
                containerStyle={{ position: 'absolute', top: 6, right: 122 }}
              />
            )}
        </View>

        <View style={{ flexDirection: 'column', height: 220, backgroundColor: `${colorTheme.beige}` }}>
          <View style={{ flex: 0.7 }}>
            {/* AVATAR */}
            <Avatar
              size={100}
              rounded
              containerStyle={{ position: 'absolute', top: '25%', right: '38%' }}
              source={require(`../../assets/avatars/012.png`)}
              // source={require(`../../assets/avatars/0${userData.avatar}.png`)}
            >
              {/* EDIT AVATAR */}
              {/* <Avatar.Accessory
                size={24}
                overlayContainerStyle	={{ boxShadow: 'none', backgroundColor: 'blue' }}
                onPress={() => console.log('editing avatar') || navigation.navigate('Select Icon Screen')}
              /> */}
            </Avatar>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', top: 2 }}>
            {/* USERNAME */}
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
              {userData.username}
            </Text>
            {/* <Icon
              style={{ paddingLeft: 8, top: 5 }}
              size={15}
              name='pencil'
              type='font-awesome'
              color={colorTheme.blue}
              onPress={() => console.log('hello')} /> */}
            </View>
        </View>

        {/* TABS */}
        <View style={{ height: 40, backgroundColor: `${colorTheme.beige}` }}>

          <View style={{ height: 40, backgroundColor: `${colorTheme.beige}`, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={[currentTab === 'joined' ? styles.selectedTabView : styles.unselectedTabView]}>
              <Text
                suppressHighlighting={true}
                style={[currentTab === 'joined' ? styles.selectedTab : styles.unselectedTab]}
                onPress={() => {
                  setCurrentTab('joined');
                  setSpaceData(userData.spaces_joined);
                }}
              >
                Joined Spaces
              </Text>
            </View>
            <View style={[currentTab === 'created' ? styles.selectedTabView : styles.unselectedTabView]}>
              <Text
                suppressHighlighting={true}
                style={[currentTab === 'created' ? styles.selectedTab : styles.unselectedTab]}
                onPress={() => {
                  setCurrentTab('created');
                  setSpaceData(userData.spaces_created);
                }}
              >
                Created Spaces
              </Text>
            </View>
          </View>
        </View>

        <View>
          <SearchBar
            platform="ios"
            containerStyle={{ backgroundColor: `${colorTheme.beige}` }}
            inputContainerStyle={{ backgroundColor: `${colorTheme.yellow}` }}
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

const getUser = (name, cb) => {
  axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${name}`)
    .then(({ data }) => cb(data))
    .catch((err) => console.log('axios error for /users in profile', err));
};

const getConfessions = (name, cb) => {
  axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?&space_creator=${name}&reported=true`)
    .then(({ data }) => cb(data))
    .catch((err) => console.log('axios error for /confessions in profile', err));
};

const initializeCookies = async () => {
  try {
    const reported = await AsyncStorage.setItem('reported', '[]');
    const viewedCount = await AsyncStorage.setItem('viewedCount', '0');
  } catch (e) {
    console.log('cookie initialization error', e);
  }
};

const getCookies = async (cb) => {
  try {
    const jsonValue = await AsyncStorage.getItem('reported');
    jsonValue ? cb(JSON.parse(jsonValue).z) : cb(null);
  } catch (e) {
    console.log('get cookie error', e);
  }
};

const getCookieCount = async (cb) => {
  try {
    const count = await AsyncStorage.getItem('viewedCount');
    count ? cb(Number(count)) : cb(0);
  } catch (e) {
    console.log('get cookie count error', e);
  }
};

const colorTheme = {
  beige: '#FEF1E6',
  yellow: '#F9D5A7',
  orange: '#FFB085',
  blue: '#90AACB',
};

const styles = StyleSheet.create({
  selectedTab: {
    fontSize: '18%',
    textDecorationThickness: '2%',
    color: '#90aacb',
    fontWeight: 'bold',
  },
  selectedTabView: {
    borderBottomWidth: '3px',
    borderBottomColor: '#90aacb',
    paddingBottom: 1,
    fontWeight: 'bold',
  },
  unselectedTab: {
    fontSize: '18%',
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  unselectedTabView: {
    color: 'rgba(0,0,0,0.5)',
    paddingBottom: 1,
    fontWeight: 'bold',
  },
});

export default Profile;