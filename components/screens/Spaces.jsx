import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import axios from 'axios';

const Rooms = ({navigation}) => {
  const [spaces, setSpaces] = React.useState([]);
  const [adminSpaces, setAdminSpaces] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/lookingforpeace').then((data) => {setSpaces(data.data.spaces_joined); setAdminSpaces(data.data.spaces_created);})
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => navigation.navigate('Space')}>Rooms</Text>
      {spaces.map((space) => <Text onPress={() => navigation.navigate('Space', {space_name: space, admin: adminSpaces.includes(space), username: 'lookingforpeace'})}>{space}</Text>)}
    </View>
  );
};

export default Rooms;