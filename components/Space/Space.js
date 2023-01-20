import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Comments from './../Comments/Comments.js';
import ConfessionList from './../Confession/ConfessionList.js';
import GlobalStyles from './../GlobalStyles.js';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import MemberInfo from './MemberInfo.js';
import { useFonts } from 'expo-font';

const Space = ({route, navigation}) => {
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
    axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces/${space_name}/${user_name}/ban`)
    .then(() => {
      axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces?space_name=${space_name}`)
      .then((data) => {
        setNumMembers(data.data[0].members.length);
        setSpaceMembers(data.data[0].members);
      }).catch((err) => console.log(err));
      axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=${route.params.space_name}&count=200`)
      .then((data) => {setConfessions(data.data)}).catch((err) => console.log(err));

    }).catch((err) => console.log(err));
  }

  const leaveSpace = (username, space_name) => {
    axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces/${space_name}/${username}/remove`)
      .then(() => {
        setLeaveJoin(0);
        setNumMembers(numMembers-1);
        // route.params.onLeaveJoin(-1, space_name);
      }).catch((err) => console.log('leaveSPACE', err));
  }

  const joinSpace = (username, space_name) => {
    axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces/${space_name}/${username}/add`)
      .then(() => {
        setLeaveJoin(1);
        setNumMembers(numMembers+1);
        // route.params.onLeaveJoin(1, space_name);
      }).catch((err) => console.log(err));
  }

  const createConfession = (username, text, space_name) => {
    axios.post(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions`, {created_by: username, confession: text, space_name: space_name })
      .then(() => {
        axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=${space_name}&count=200`)
        .then((data) => {setConfessions(data.data)}).catch((err) => console.log(err));
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
  }

  const updateSpaceDetails = (description, guidelines) => {
    axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces/${route.params.space_name}`, {description: description, guidelines: guidelines})
      .then(() => {
        setEditMode(false);
        setDisableEdit(true);
        axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces?space_name=${route.params.space_name}`)
        .then((data) => {setSpaceDescription(data.data[0].description);
          setEditSpaceDescription(data.data[0].description);
          setSpaceGuidelines(data.data[0].guidelines.join('\n'));
          setEditSpaceGuidelines(data.data[0].guidelines.join('\n'));
        }).catch((err) => console.log(err));
      }).catch((err) => console.log(err));
  }

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces?space_name=${route.params.space_name}`)
      .then((data) => {setSpaceDescription(data.data[0].description);
        setEditSpaceDescription(data.data[0].description);
        setSpaceGuidelines(data.data[0].guidelines.join('\n'));
        setEditSpaceGuidelines(data.data[0].guidelines.join('\n'));
        setNumMembers(data.data[0].members.length);
        if (isAdmin) {
          setSpaceMembers(data.data[0].members);
        }
        if(data.data[0].members.includes(route.params.username)) {
          setLeaveJoin(1);
        }
      }).catch((err) => console.log(err))

  }, []);

  React.useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=${route.params.space_name}&count=200`)
    .then((data) => {setConfessions(data.data)}).catch((err) => console.log(err));
  }, [refreshing]);

  React.useEffect(() => {
    if (writeConfession.length > 0 && disablePost) {
      setDisablePost(false)
    }
    if (writeConfession === '' && !disablePost) {
      setDisablePost(true);
    }
  }, [writeConfession])

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
      <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'space-between', marginLeft:'1%', marginRight:'1%', paddingTop: '2%'}}>
        <View>
          <Text style={{fontSize: '20%', fontFamily:'FuzzyBubblesBold'}}>{route.params.space_name}</Text>
          <Text style={{color: 'rgba(0,0,0,0.7)'}}>{numMembers} {'Member(s)'}</Text>
        </View>
        {(leavejoin===0 && !isAdmin) && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => joinSpace(route.params.username, route.params.space_name)}>
          <Text style={styles.leavejoinText}>join</Text>
        </TouchableOpacity>}
        {(leavejoin===1 && !isAdmin) && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => leaveSpace(route.params.username, route.params.space_name)}>
          <Text style={styles.leavejoinText}>leave</Text>
        </TouchableOpacity>}
        {isAdmin && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => {setEditMode(true)}}>
          <Text style={styles.leavejoinText}>edit</Text>
        </TouchableOpacity>}
      </View>
      <View style={{flex: 0.5, marginLeft:'1%', marginRight:'1%', paddingTop: '1%'}} >
        <Text style={{fontFamily:'FuzzyBubblesRegular'}}>{spaceDescription} </Text>
      </View>
      <View style={{flex: 0.4, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={[tab !== 0? styles.unselectedTabView: styles.selectedTabView]}><Text style={[tab !== 0? styles.unselectedTab: styles.selectedTab]} onPress={() => {setTab(0)}}>Feed</Text></View>
        <View style={[tab !== 1? styles.unselectedTabView: styles.selectedTabView]}><Text style={[tab !== 1? styles.unselectedTab: styles.selectedTab]}onPress={() => {setTab(1)}}>Guidelines</Text></View>
        {isAdmin && <View style={[tab !== 2? styles.unselectedTabView: styles.selectedTabView]}><Text style={[tab !== 2? styles.unselectedTab: styles.selectedTab]}onPress={() => {setTab(2)}}>Members</Text></View>}
      </View >
      {/* {tab === 0 && <View style={{ flex: 8, backgroundColor: 'red'}} />} */}
      <View style={{flex: 8, }}>

        {tab === 0 && <View style={{ flex: 7.5, paddingTop: 9}} >
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <ConfessionList allConfessions={confessions}isRoom={true} isHome={false}nav={navigation} />
          </ScrollView>
        </View>}
        {tab === 1 && <View style={{ flex: 8, paddingTop: 9}}><Text style={{fontSize:18, padding:4, fontFamily:'FuzzyBubblesRegular'}}>{spaceGuidelines}</Text></View>}
        {tab === 2 && <View style={{ flex: 8, paddingTop: 9, flexDirection:'column', alignItems: 'center', width:'100%'}} >
          <ScrollView style={{paddingTop:'4%'}}>
          {spaceMembers.map((member) => <MemberInfo isUser={member===route.params.username}banUser={banUser} space_name={route.params.space_name} username={member}/>)}
          </ScrollView>
          </View>}
        {tab === 0 && <View style={{flex: 0.5, alignItems:'center'}}>
          <TouchableOpacity onPress={() => {setModalVisible(true)}}>
            <Icon name="md-create-outline" size='35%'/>
          </TouchableOpacity>
        </View>}
      </View>

      <Modal visible={modalVisible} animationType='slide' style={{flex:1, backgroundColor:'#fef1e6'}}>
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <View style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:'#fef1e6', paddingRight:'2%', paddingLeft: '2%'}}>
            <TouchableOpacity onPress={() => {setModalVisible(false)}}>
            <Icon name="md-close" size='35%' color='#90aacb'/>
            </TouchableOpacity>
            {/* <Button title='close'onPress={()=>{setModalVisible(false)}}/> */}
            <Text style={{fontSize: 18, fontFamily: 'FuzzyBubblesBold', color: '#90aacb'}}>Write a confession.</Text>
            <TouchableOpacity disabled={disablePost} style={[disablePost ?styles.leavejoinContainerOpaque:styles.leavejoinContainer]} onPress={() => createConfession(route.params.username, writeConfession, route.params.space_name )}>
              <Text style={styles.leavejoinText}>post</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 10}}>
            <TextInput placeholder="Write your confession here." style={{padding:10,
        borderTopColor: '#90aacb',
        fontFamily: 'FuzzyBubblesRegular',
        borderTopWidth: 2, fontSize:20}} multiline onChangeText={text => {changeWriteConfession(text)}} value={writeConfession} />
          </View>
        </SafeAreaView>
      </Modal>
      <Modal visible={editMode} animationType='slide' style={{flex:1}}>
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <View style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginLeft: '2%', marginRight: '2%'}}>
            <TouchableOpacity onPress={() => {setEditMode(false)}}>
            <Icon name="md-close" size='35%' color='#90aacb'/>
            </TouchableOpacity>
            {/* <Button title='close'onPress={()=>{setModalVisible(false)}}/> */}
            <Text style={{fontSize: 18, fontFamily:'FuzzyBubblesBold', color: '#90aacb'}}>Edit Space Information</Text>
            <TouchableOpacity disabled={disableEdit} style={[disableEdit ?styles.leavejoinContainerOpaque:styles.leavejoinContainer]} onPress={() =>  updateSpaceDetails(editSpaceDescription, editSpaceGuidelines.split('\n'))}>
              <Text style={styles.leavejoinText}>update</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2}}>
            <Text style={{fontSize: 20, color: '#90aacb', paddingLeft:'4%'}}>Edit Description:</Text>
            <TextInput style={{padding:10, fontSize:16, paddingLeft: '5%', fontFamily: 'FuzzyBubblesRegular',
        borderTopColor: '#90aacb',
        borderTopWidth: 1,}} multiline onChangeText={text => setEditSpaceDescription(text)} value={editSpaceDescription} />
          </View>
          <View style={{flex:11}}>
            <Text style={{fontSize:20, color: '#90aacb', paddingLeft:'4%'}}>Edit Guidelines:</Text>
            <TextInput style={{padding:10, fontSize:18, paddingLeft: '5%', fontFamily: 'FuzzyBubblesRegular',
        borderTopColor: '#90aacb',
        borderTopWidth: 1,}} multiline onChangeText={text => setEditSpaceGuidelines(text)} value={editSpaceGuidelines} />
          </View>
        </SafeAreaView>
      </Modal>
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
  selectedTab: {
    fontSize:'18%',
    textDecorationThickness: '2%',
    color: '#90aacb',
    fontWeight: 'bold',
  },
  selectedTabView: {
    borderBottomWidth: '3px',
    borderBottomColor: '#90aacb',
    paddingBottom: 1,
  },
  unselectedTab: {
    fontSize:'18%',
    color: 'rgba(0,0,0,0.5)',

  },
  unselectedTabView: {
    color: 'rgba(0,0,0,0.5)',
    paddingBottom: 1,
  },
  leavejoinContainer:{
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "#90aacb",
    borderRadius: 10,
    paddingVertical: 7,
    marginTop: 2,
    // paddingHorizontal: 11,
    width:'20%'
  },
  leavejoinText: {
    fontSize: 14,
    color: "#90aacb",
    // fontWeight: "bold",
    alignSelf: "center",
    alignItems:'center'
  },
  leavejoinContainerOpaque:{
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "#90aacb",
    borderRadius: 10,
    paddingVertical: 7,
    marginTop: 2,
    // paddingHorizontal: 11,
    width:'20%',
    opacity: 0.5
  },

});

export default Space;