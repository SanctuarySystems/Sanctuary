import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, Dimensions, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Comments from './../Comments/Comments.js';
import ConfessionList from './../Confession/ConfessionList.js';
import GlobalStyles from './../GlobalStyles.js';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { UsernameContext, apiUrl } from '../../App.js';

const windowWidth = Dimensions.get('window').width;

const MemberInfo = ({ space_name, username, banUser, isUser }) => {
  const [reported, setReported] = React.useState(0);
  const [reports, setReports] = React.useState(0);
  const [confessions, setConfessions] = React.useState(0);
  const [banModal, setBanModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const { userToken } = useContext(UsernameContext);

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBubblesRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBubblesBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf')
  });

  React.useEffect(() => {
    axios.get(`${apiUrl}/confessions?space_name=${space_name}&username=${username}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((data) => setConfessions(data.data.length)).catch((err) => console.log(err));

    axios.get(`${apiUrl}/users/${username}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
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

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }

  return (
    <View style={{paddingBottom:'2%'}}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'top' }}>
          <Text style={styles.username}>{username}</Text>

        <View style={{ justifyContent: 'center' }}>
          <Text style={{fontSize:15}}>{confessions} confessions,
            {' '}{reported} reported,
            {' '}{reports} reports
          </Text>
        </View>
        </View>
        {!isUser &&
          <TouchableOpacity style={styles.leavejoinContainer} onPress={() => setBanModal(true)}>
            <Text style={styles.leavejoinText}>ban</Text>
          </TouchableOpacity>}
          {isUser &&
           <TouchableOpacity onPress={() => setDeleteModal(true)}style={styles.leavejoinContainerAdmin}>
           <Text style={styles.leavejoinTextAdmin}>admin</Text>
          </TouchableOpacity>}
      </View>
      <Modal visible={banModal} transparent={true} animationType='slide'>
        <View style={styles.banModalContainer}>
          <TouchableOpacity onPress={() => setBanModal(false)} style={styles.topTouchable} />
          <View style={styles.modal}>
            <View style={{alignItems:'center', paddingBottom:'6%'}}>
              <Text style={{ fontSize:16}}>Ban user </Text>
              <Text style={{fontFamily:"FuzzyBubblesBold", fontSize: 19}}>{username}</Text>
              <Text style={{fontSize: 16}}>from space </Text>
              <Text style={{fontFamily:'FuzzyBubblesBold', fontSize: 19}}>{space_name} ?</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity style={styles.leavejoinContainerNo} onPress={()=>setBanModal(false)}>
                <Text style={styles.leavejoinTextNo}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.leavejoinContainerBan} onPress={() => {banUser(username, space_name); setBanModal(false);}}>
                <Text style={styles.leavejoinTextBan}>Ban</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => setBanModal(false)} style={styles.bottomTouchable} />
        </View>
      </Modal>
      <Modal visible={deleteModal} transparent={true} animationType='slide'>
        <View style={styles.banModalContainer}>
          <TouchableOpacity onPress={() => setDeleteModal(false)} style={styles.deleteTopTouchable} />
          <View style={styles.deleteModal}>
            <View style={{alignItems:'center', paddingBottom:'5%'}}>
              <Text style={{ fontSize:16}}>Delete space</Text>
              <Text style={{fontFamily:'FuzzyBubblesBold', fontSize: 19}}>{space_name} ?</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity style={styles.leavejoinContainerNo} onPress={()=>setDeleteModal(false)}>
                <Text style={styles.leavejoinTextNo}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.leavejoinContainerBan} onPress={() => {setDeleteModal(false);}}>
                <Text style={styles.leavejoinTextBan}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => setDeleteModal(false)} style={styles.deleteBottomTouchable} />
        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth-10,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffb085',
    padding: '3%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 1,
    borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  topTouchable: {
    flex: 0.4,
    width: '100%',
  },
  bottomTouchable: {
    flex: 0.5,
    width: '100%',
  },
  deleteTopTouchable: {
    flex: 0.4,
    width: '100%',
  },
  deleteBottomTouchable: {
    flex: 0.45,
    width: '100%',
  },
  banModalContainer: {
    flex: 1,
    alignItems:'center',
  },
  modal: {
    width: windowWidth-10,
    // margin: 12,
    backgroundColor: '#fff',
    flex: 0.2,
    borderRadius: 20,
    padding: 14,
    // height: '100%',s
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  deleteModal: {
    width: windowWidth-10,
    // margin: 12,
    backgroundColor: '#fff',
    flex: 0.15,
    borderRadius: 20,
    padding: 14,
    // height: '100%',s
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    paddingBottom: 0,
  },
  username: {
    fontSize: 16,
    fontFamily: 'FuzzyBubblesBold',
  },
  leavejoinContainer: {
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 11,
    width:'20%'
  },
  leavejoinText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    alignItems:'center',
  },
  leavejoinContainerNo: {
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "rgba(49, 94, 153, 1)",
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 11,
    width:'20%'
  },
  leavejoinTextNo: {
    fontSize: 12,
    color: "rgba(49, 94, 153, 1)",
    fontWeight: "bold",
    alignSelf: "center",
    alignItems:'center',
  },
  leavejoinContainerBan: {
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "rgba(49, 94, 153, 1)",
    backgroundColor: 'rgba(49, 94, 153, 1)',
    borderRadius: 10,
    paddingVertical: 9,
    // paddingHorizontal: 11,
    width:'20%'
  },
  leavejoinTextBan: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    alignItems:'center',
  },
  leavejoinContainerAdmin: {
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 11,
    width:'20%'
  },
  leavejoinTextAdmin: {
    fontSize: 12,
    color: "#ffb085",
    fontWeight: "bold",
    alignSelf: "center",
    alignItems:'center',
  },
});

export default MemberInfo;