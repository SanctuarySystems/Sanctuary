import React from "react";
import { Button, StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import axios from 'axios';
import { UsernameContext } from "../../App.js";


const windowWidth = Dimensions.get('window').width;

const Rooms = ({navigation}) => {
  const {username} = React.useContext(UsernameContext);
  const [spaces, setSpaces] = React.useState(['space1', 'space2']);
  const [adminSpaces, setAdminSpaces] = React.useState([]);
  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
      .then((data)=>{setSpaces(data.data.spaces_joined); setAdminSpaces(data.data.spaces_created);})
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
      .then((data)=>{setSpaces(data.data.spaces_joined); setAdminSpaces(data.data.spaces_created);})
      .catch((err) => console.log(err));
  }, [username]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fef1e6', paddingTop: '4%', width: '100%' }}>
      {/* <Text onPress={() => navigation.navigate('Space')}>Rooms</Text> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text>My Spaces</Text> */}
        <Text>{username}</Text>
        {spaces.map((space) => <View style={styles.spaceContainer}><Text style={styles.spaceText} onPress={() => navigation.navigate('Space', {space_name: space, isAdmin: adminSpaces.includes(space), username: username})} >{space}</Text></View>)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  spaceContainer: {
    backgroundColor: '#90aacb',
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
    fontWeight: 'bold',
    color: '#fff',
  }
})

export default Rooms;