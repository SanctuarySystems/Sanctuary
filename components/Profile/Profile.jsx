import React from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Animated,
  Image,
  Item,
  RefreshControl,
  Modal,
  TouchableOpacity
} from 'react-native';
import { Button, Avatar, Tab, Badge, SearchBar, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { UsernameContext, apiUrl } from '../../App.js';
import { colorTheme } from './colorTheme';
import { images } from './images';
import SpacesList from './SpacesList';
import { useIsFocused } from '@react-navigation/native';

const Profile = ({ navigation }) => {
  const { username, userToken } = React.useContext(UsernameContext); // username for get user call
  const [currentTab, setCurrentTab] = React.useState('joined'); // joined, created
  const [userData, setUserData] = React.useState({}); // userdata to be passed down
  const [spaceData, setSpaceData] = React.useState([]); // current data for joined/created tabs
  const [refreshing, setRefreshing] = React.useState(false);
  const [created, setCreated] = React.useState([]); // created tabs to pass down to notifications
  const [searchTerm, setSearchTerm] = React.useState(''); // search term
  const [reportedPosts, setReportedPosts] = React.useState([]); // reportedPosts from confessions endpoint
  const [notifsNum, setNotifsNum] = React.useState(0); // total notifs
  const [notifsRead, setNofitsRead] = React.useState(0); // total notifs read
  const [showModal, setShowModal] = React.useState(false); // settings modal

  const [viewedCookies, setViewedCookies] = React.useState([]); // viewedCookies stored via async storage

  const isFocused = useIsFocused(); // react hook for when tab is selected

  let refreshNotifications;

  const [fontsLoaded] = useFonts({
    FuzzyBubblesRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBubblesBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  React.useEffect(() => {
    // grab user data
    getUser(username, (data) => {
      setUserData(data);
      setSpaceData(data.spaces_joined);
      setCreated(data.spaces_created);
      //setNofitsRead(userData.reported_read);
    }, userToken);

    getConfessions(username, (data) => {
      setReportedPosts(data);

      setNotifsNum(countReported(data));
    }, userToken);

    // initialize and set cookies for notifications every 30k seconds
    initializeCookies();
    refreshCookies();
  }, [isFocused]);

  React.useEffect(() => {
    // update user data
    getUser(username, (data) => {
      setUserData(data);
      setSpaceData(data.spaces_joined);
      setCreated(data.spaces_created);
    }, userToken);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  // grab viewedCookies for viewed notifications every 30k seconds
  const refreshCookies = () => {
    refreshNotifications = setInterval(() => {
      getCookies(setViewedCookies);
    }, 30000);
  };

  if (!fontsLoaded || !username || !userData) return;

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <ScrollView
        stickyHeaderIndices={[3]}
        automaticallyAdjustKeyboardInsets
        bounces='false'
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileView}>
          {/* NOTIFICATIONS */}
          <Icon
            name='bell'
            type='feather'
            color={colorTheme.blue}
            containerStyle={styles.header}
            onPress={() => navigation.navigate('Notifications', {
              username: userData.username,
              viewedCookies,
              notifsNum,
              setNofitsRead,
              reportedPosts,
            })}
          />
          { notifsNum > notifsRead
            && (
              <Badge
                status="error"
                value={notifsNum - notifsRead}
                value='1'
                containerStyle={{ position: 'absolute', top: 6, right: 66 }}
              />
            )}

          {/* SETTINGS */}
          <Icon
            name='settings'
            type='feather'
            color={colorTheme.blue}
            containerStyle={styles.header}
            onPress={() => setShowModal(true)}
          />
        </View>

        <View style={styles.userView}>
          <View style={styles.avatarView}>
            {/* AVATAR */}
            <Avatar
              size={100}
              rounded
              containerStyle={styles.avatar}
              source={images[userData.avatar - 1]}
            />
          </View>

          <View style={styles.userContainer}>
            {/* USERNAME */}
            <Text style={styles.username}> {userData.username} </Text>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabsView}>
          <View style={styles.tabsContainer}>
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
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
            inputStyle={{}}
            loadingProps={{}}
            onChangeText={(newVal) => setSearchTerm(newVal)}
            onClearText={() => setSearchTerm('')}
            placeholder="Search..."
            placeholderTextColor="#888"
            showCancel
            cancelButtonTitle="Cancel"
            cancelButtonProps={styles.searchCancel}
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
            refreshing={refreshing}
            setRefreshing={setRefreshing}
          />
        </View>
      </ScrollView>

      <Modal styles={styles.modal} visible={showModal} animationType='slide' transparent>
          <TouchableOpacity style={styles.closeModalArea} onPress={() => setShowModal(false)} />
          <TouchableOpacity style={styles.viewModal} onPress={() => setShowModal(false)}>
            <SafeAreaView style={styles.report} onPress={() => setShowModal(false)}>
              {/* CHANGE AVATAR */}
              <TouchableOpacity
                style={styles.reportButton}
                onPressOut={() => {
                  setShowModal(false);
                  console.log('editing avatar') || navigation.navigate('Select Icon Screen');
                }}
              >
                <Text style={styles.reportText}>Edit Avatar</Text>
              </TouchableOpacity>
              {/* CHANGE PW */}
              <TouchableOpacity
                style={styles.reportButton}
                onPressOut={() => {
                  setShowModal(false);
                  console.log('changing PW') || navigation.navigate('Change Password Screen');
                }}
              >
                <Text style={styles.reportText}>Update Password</Text>
              </TouchableOpacity>
              {/* LOG OUT BUTTON */}
              <TouchableOpacity
                style={styles.reportButton}
                onPressOut={() => {
                  setShowModal(false);
                  console.log('logging out') || navigation.navigate('Welcome Screen');
                }}
              >
                <Text style={styles.reportText}>Log Out</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    height: 50,
    backgroundColor: colorTheme.beige,
  },
  header: {
    padding: 8,
  },
  userView: {
    flexDirection: 'column',
    height: 220,
    backgroundColor: colorTheme.beige,
  },
  avatarView: {
    flex: 0.7,
  },
  avatar: {
    position: 'absolute',
    top: '25%',
    right: '38%',
    width: 100,
    height: 100,
  },
  userContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    top: 2
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colorTheme.darkblue,
    fontFamily: "FuzzyBubblesBold",
  },
  tabsView: {
    height: 40,
    backgroundColor: colorTheme.beige,
  },
  tabsContainer: {
    height: 40,
    backgroundColor: colorTheme.beige,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  selectedTabView: {
    borderBottomWidth: '3px',
    borderBottomColor: '#90aacb',
    paddingBottom: 1,
    fontWeight: 'bold',
  },
  unselectedTabView: {
    color: 'rgba(0,0,0,0.5)',
    paddingBottom: 1,
    fontWeight: 'bold',
  },
  selectedTab: {
    fontSize: '18%',
    textDecorationThickness: '2%',
    color: '#90aacb',
    fontWeight: 'bold',
  },
  unselectedTab: {
    fontSize: '18%',
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: colorTheme.beige,
  },
  searchInput: {
    backgroundColor: colorTheme.yellow,
  },
  searchCancel: {
    color: colorTheme.blue,
  },
  modal: {
    backgroundColor: 'red',
    flex: 1,
    height: '100%',
  },
  viewModal: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    height: '100%',
    flex: 0.27,
  },
  closeModalArea: {
    flex: 0.75,
  },
  report: {
    width: '100%',
    marginTop: 'auto',
    height: '100%',
    backgroundColor: colorTheme.beige,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  reportButton: {
    marginTop: 10,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '4%',
    backgroundColor: colorTheme.blue,
    borderRadius: 10,
    alignItems: 'center',
  },
  reportText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const getUser = (name, cb, userToken) => {
  axios.get(`${apiUrl}/users/${name}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  })
    .then(({ data }) => cb(data))
    .catch((err) => console.log('axios error for /users in profile', err));
};

const getConfessions = (name, cb, userToken) => {
  axios.get(`${apiUrl}/confessions?&space_creator=${name}&reported=true`, {
    headers: { Authorization: `Bearer ${userToken}` },
  })
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

// const getCookieCount = async (cb) => {
//   try {
//     const count = await AsyncStorage.getItem('viewedCount');
//     count ? cb(Number(count)) : cb(0);
//   } catch (e) {
//     console.log('get cookie count error', e);
//   }
// };

const countReported = (data) => {
  let counter = 0;

  for (let i = 0; i < data.length; i++) {
    counter += 1;

    console.log('comments', data[i].comments);
    if (data[i].comments.length > 0) {
      counter += 1;
    }
  }
  return counter;
}

export default Profile;
