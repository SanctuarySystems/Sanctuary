import React from "react";
import { Button, StyleSheet, Text, View, ScrollView, Dimensions, RefreshControl } from "react-native";
import axios from 'axios';
import { UsernameContext } from "../../App.js";
import { useFonts } from 'expo-font';


const windowWidth = Dimensions.get('window').width;

const Rooms = ({navigation}) => {
  const {username, setUsername } = React.useContext(UsernameContext);
  const [spaces, setSpaces] = React.useState(['space1', 'space2']);
  const [adminSpaces, setAdminSpaces] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBubblesRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf')
  });

  // const onLeaveJoin = (leavejoin, spacename) => {
  //   if (leavejoin === 1) {
  //     const clone = spaces.slice();
  //     clone.push(spacename);
  //     setSpaces(clone);
  //   } else {
  //     const clone = spaces.slice();
  //     clone.pop();
  //     setSpaces(clone);
  //   }
  // };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
      .then((data)=>{setSpaces(data.data.spaces_joined); setAdminSpaces(data.data.spaces_created);})
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
      .then((data)=>{setSpaces(data.data.spaces_joined); setAdminSpaces(data.data.spaces_created);})
      .catch((err) => console.log(err));
  }, [refreshing]);
  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
      .then((data)=>{setSpaces(data.data.spaces_joined); setAdminSpaces(data.data.spaces_created);})
      .catch((err) => console.log(err));
  }, [username]);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fef1e6', fontFamily:'FuzzyBubblesRegular', paddingTop: '4%', width: '100%' }}>
      {/* <Text onPress={() => navigation.navigate('Space')}>Rooms</Text> */}
      {(!spaces || spaces.length === 0)
      && (
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text>You have not joined any spaces. Pull down to refresh.</Text>
      </ScrollView>
      )}
      {(spaces && spaces.length > 0)
      && (
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        { spaces.map((space) => <View style={styles.spaceContainer}><Text style={styles.spaceText} onPress={() => navigation.navigate('Space', {space_name: space, isAdmin: adminSpaces.includes(space), username: username})} >{space}</Text></View>)}
      </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  spaceContainer: {
    backgroundColor: '#ffb085',
    width: windowWidth-10,
    alignItems: 'center',
    padding: 14,
    paddingLeft: '20%',
    paddingRight: '20%',
    marginBottom: '5%',
    borderRadius: 10,
  },
  spaceText: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'FuzzyBubblesRegular',
  }
})

export default Rooms;