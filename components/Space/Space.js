import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Comments from './../Comments/Comments.js';
import ConfessionList from './../Confession/ConfessionList.js';
import GlobalStyles from './../GlobalStyles.js';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useFonts } from 'expo-font';
import MemberInfo from './MemberInfo.js';
import SpaceHeader from './SpaceHeader.js';
import SpaceTabs from './SpaceTabs.js';
import SpaceWindow from './SpaceWindow.js';
import WriteConfessionModal from './WriteConfessionModal.js';
import EditSpaceInfoModal from './EditSpaceInfoModal.js';
import { UsernameContext, apiUrl } from '../../App.js';

const Space = ({ route, navigation }) => {
  const [tab, setTab] = React.useState(0);
  const [leavejoin, setLeaveJoin] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [writeConfession, changeWriteConfession] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(route.params.isAdmin);
  const [editMode, setEditMode] = React.useState(false);
  const [spaceDescription, setSpaceDescription] = React.useState('space description')
  const [spaceGuidelines, setSpaceGuidelines] = React.useState('GUIDELINES');
  const [spaceMembers, setSpaceMembers] = React.useState([]);
  const [numMembers, setNumMembers] = React.useState(0);
  const [disablePost, setDisablePost] = React.useState(true);
  const [editSpaceDescription, setEditSpaceDescription] = React.useState('space description');
  const [editSpaceGuidelines, setEditSpaceGuidelines] = React.useState('GUIDELINES');
  const [disableEdit, setDisableEdit] = React.useState(true);
  const [confessions, setConfessions] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const { userToken } = useContext(UsernameContext);

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBubblesRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBubblesBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf')
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const banUser = (user_name, space_name) => {
    //wrong url for banning
    axios.patch(`${apiUrl}/spaces/${space_name}/${user_name}/ban`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        axios.get(`${apiUrl}/spaces?space_name=${space_name}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
          .then((data) => {
            setNumMembers(data.data[0].members.length);
            setSpaceMembers(data.data[0].members);
          }).catch((err) => console.log(err));
        axios.get(`${apiUrl}/confessions?space_name=${route.params.space_name}&count=200`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
          .then((data) => { setConfessions(data.data); }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const leaveSpace = (username, space_name) => {
    axios.patch(`${apiUrl}/spaces/${space_name}/${username}/remove`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        setLeaveJoin(0);
        setNumMembers(numMembers - 1);
        // route.params.onLeaveJoin(-1, space_name);
      }).catch((err) => console.log('leaveSPACE', err));
  };

  const joinSpace = (username, space_name) => {
    axios.patch(`${apiUrl}/spaces/${space_name}/${username}/add`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        setLeaveJoin(1);
        setNumMembers(numMembers + 1);
        // route.params.onLeaveJoin(1, space_name);
      }).catch((err) => console.log(err));
  };

  const createConfession = (username, text, space_name) => {
    axios.post(`${apiUrl}/confessions`, { created_by: username, confession: text, space_name }, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        axios.get(`${apiUrl}/confessions?space_name=${space_name}&count=200`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
          .then((data) => { setConfessions(data.data); }).catch((err) => console.log(err));
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  const updateSpaceDetails = (description, guidelines) => {
    axios.patch(`${apiUrl}/spaces/${route.params.space_name}`, {}, { description, guidelines }, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        setEditMode(false);
        setDisableEdit(true);
        axios.get(`${apiUrl}/spaces?space_name=${route.params.space_name}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
          .then((data) => {
            setSpaceDescription(data.data[0].description);
            setEditSpaceDescription(data.data[0].description);
            setSpaceGuidelines(data.data[0].guidelines.join('\n'));
            setEditSpaceGuidelines(data.data[0].guidelines.join('\n'));
          })
          .catch((err) => console.log(err));
      }).catch((err) => console.log(err));
  };

  React.useEffect(() => {
    axios.get(`${apiUrl}/spaces?space_name=${route.params.space_name}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((data) => {
        setSpaceDescription(data.data[0].description);
        setEditSpaceDescription(data.data[0].description);
        setSpaceGuidelines(data.data[0].guidelines.join('\n'));
        setEditSpaceGuidelines(data.data[0].guidelines.join('\n'));
        setNumMembers(data.data[0].members.length);
        if (isAdmin) {
          setSpaceMembers(data.data[0].members);
        }
        if (data.data[0].members.includes(route.params.username)) {
          setLeaveJoin(1);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    axios.get(`${apiUrl}/confessions?space_name=${route.params.space_name}&count=200&exact=true`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((data) => { setConfessions(data.data); })
      .catch((err) => console.log(err));
  }, [refreshing]);

  React.useEffect(() => {
    if (writeConfession.length > 0 && disablePost) {
      setDisablePost(false);
    }
    if (writeConfession === '' && !disablePost) {
      setDisablePost(true);
    }
  }, [writeConfession]);

  React.useEffect(() => {
    if (spaceDescription !== editSpaceDescription || spaceGuidelines !== editSpaceGuidelines) {
      setDisableEdit(false);
    } else {
      if (!disableEdit) {
        setDisableEdit(true);
      }
    }
  }, [editSpaceDescription, editSpaceGuidelines])

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea} >
      <View style={styles.container}>
      <SpaceHeader leavejoin={leavejoin} isAdmin={isAdmin} joinSpace={joinSpace} leaveSpace={leaveSpace} setEditMode={setEditMode} numMembers={numMembers} username={route.params.username} space_name={route.params.space_name}/>
        <View style={styles.spaceDescription} >
          <Text style={{}}>{spaceDescription} </Text>
        </View>
        <SpaceTabs isAdmin={isAdmin} tab={tab} setTab={setTab}/>
        <SpaceWindow tab={tab} onRefresh={onRefresh} refreshing={refreshing} confessions={confessions} spaceGuidelines={spaceGuidelines} navigation={navigation} username={route.params.username} banUser={banUser} space_name={route.params.space_name} setModalVisible={setModalVisible} spaceMembers={spaceMembers}/>
        <WriteConfessionModal modalVisible={modalVisible} setModalVisible={setModalVisible} disablePost={disablePost} writeConfession={writeConfession} changeWriteConfession={changeWriteConfession} createConfession={createConfession} username={route.params.username} space_name={route.params.space_name}/>
        <EditSpaceInfoModal editMode={editMode} setEditMode={setEditMode} disableEdit={disableEdit} updateSpaceDetails={updateSpaceDetails} editSpaceDescription={editSpaceDescription} editSpaceGuidelines={editSpaceGuidelines} setEditSpaceDescription={setEditSpaceDescription} setEditSpaceGuidelines={setEditSpaceGuidelines} />

      {/* <Modal visible={editMode} animationType='slide' style={{flex:1}}>
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <View style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginLeft: '2%', marginRight: '2%'}}>
            <TouchableOpacity onPress={() => {setEditMode(false)}}>
            <Icon name="md-close" size='35%' color='rgba(49, 94, 153, 1)'/>
            </TouchableOpacity>
            {/* <Button title='close'onPress={()=>{setModalVisible(false)}}/> */}
            {/* <Text style={{fontSize: 18, fontWeight:'bold', color: 'rgba(49, 94, 153, 1)'}}>Edit Space Information</Text>
            <TouchableOpacity disabled={disableEdit} style={[disableEdit ?styles.leavejoinContainerOpaque:styles.leavejoinContainer]} onPress={() =>  updateSpaceDetails(editSpaceDescription, editSpaceGuidelines.split('\n'))}>
              <Text style={styles.leavejoinText}>update</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2}}>
            <Text style={{fontSize: 20, color: 'rgba(49, 94, 153, 1)', paddingLeft:'4%'}}>Edit Description:</Text>
            <TextInput style={{padding:10, fontSize:16, paddingLeft: '5%',
        borderTopColor: 'rgba(49, 94, 153, 1)',
        borderTopWidth: 1,}} multiline onChangeText={text => setEditSpaceDescription(text)} value={editSpaceDescription} />
          </View>
          <View style={{flex:11}}>
            <Text style={{fontSize:20, color: 'rgba(49, 94, 153, 1)', paddingLeft:'4%'}}>Edit Guidelines:</Text>
            <TextInput style={{padding:10, fontSize:18, paddingLeft: '5%', fontFamily: 'FuzzyBubblesRegular',
        borderTopColor: 'rgba(49, 94, 153, 1)',
        borderTopWidth: 1,}} multiline onChangeText={text => setEditSpaceGuidelines(text)} value={editSpaceGuidelines} />
          </View>
        </SafeAreaView>
      </Modal>  */}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef1e6',
    // alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '98%'
  },
  spaceDescription: {
    flex: 0.5,
    marginLeft:'1%',
    marginRight:'1%',
    paddingTop: '1%'
  },
  leavejoinContainer:{
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "rgba(49, 94, 153, 1)",
    borderRadius: 10,
    paddingVertical: 7,
    marginTop: 2,
    // paddingHorizontal: 11,
    width:'20%'
  },
  leavejoinText: {
    fontSize: 14,
    color: "rgba(49, 94, 153, 1)",
    // fontWeight: "bold",
    alignSelf: "center",
    alignItems:'center'
  },
  leavejoinContainerOpaque:{
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "rgba(49, 94, 153, 1)",
    borderRadius: 10,
    paddingVertical: 7,
    marginTop: 2,
    // paddingHorizontal: 11,
    width:'20%',
    opacity: 0.5
  },

});

export default Space;