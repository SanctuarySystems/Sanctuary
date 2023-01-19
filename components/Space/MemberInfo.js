import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Comments from './../Comments/Comments.js';
import ConfessionList from './../Confession/ConfessionList.js';
import GlobalStyles from './../GlobalStyles.js';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const MemberInfo = ({ space_name, username, banUser }) => {
  const [reported, setReported] = React.useState(0);
  const [reports, setReports] = React.useState(0);
  const [confessions, setConfessions] = React.useState(0);
  const [banModal, setBanModal] = React.useState(false);

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=${space_name}&username=${username}`)
      .then((data) => setConfessions(data.data.length)).catch((err) => console.log(err));

    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${username}`)
      .then((data) => {
        if (data.data.reported.filter((space)=> space.space_name === space_name).length > 0) {
          setReported(data.data.reported
            .filter((space) => space.space_name === space_name)
            .map((space) => space.qty)[0]);
        }
        if (data.data.reports.filter((space) => space.space_name === space_name).length > 0) {
          setReports(data.data.reports
            .filter((space) => space.space_name === space_name)
            .map((space) => space.qty)[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{paddingBottom:'3%'}}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity style={styles.leavejoinContainer} onPress={() => setBanModal(true)}>
            <Text style={styles.leavejoinText}>ban</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{fontSize:15}}>{confessions} confessions,
            {' '}{reported} reported,
            {' '}{reports} reports
          </Text>
        </View>
      </View>
      <Modal visible={banModal} transparent={true} animationType='slide'>
        <View style={{ flex: 1, marginTop: '70%' }}>
          <View style={styles.modal}>
            <Text>Ban user </Text>
            <Text style={{fontWeight:"bold"}}>{username}</Text>
            <Text>from space </Text>
            <Text style={{fontWeight:'bold'}}>{space_name}?</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity style={styles.leavejoinContainer} onPress={()=>setBanModal(false)}>
                <Text style={styles.leavejoinText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.leavejoinContainer} onPress={() => {banUser(username, space_name); setBanModal(false);}}>
                <Text style={styles.leavejoinText}>Ban</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'cornflowerblue',
    padding: '4%',
    paddingLeft: '4%',
    paddingRight: '4%',
    marginBottom: '4%',
    borderRadius: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leavejoinContainer: {
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "#734f96",
    borderRadius: 10,
    paddingVertical: 9,
    // paddingHorizontal: 11,
    width:'20%'
  },
  leavejoinText: {
    fontSize: 12,
    color: "#734f96",
    fontWeight: "bold",
    alignSelf: "center",
    alignItems:'center',
  },
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MemberInfo;