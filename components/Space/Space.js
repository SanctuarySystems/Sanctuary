import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Comments from './../Comments/Comments.js';
import ConfessionList from './../Confession/ConfessionList.js';
import GlobalStyles from './../GlobalStyles.js';
import Icon from 'react-native-vector-icons/Ionicons';

const Space = () => {
  const [tab, setTab] = React.useState(0);
  const [leavejoin, setLeaveJoin] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [writeConfession, changeWriteConfession] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(true);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea} >
      <View style={styles.container}>
      <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'space-between', marginLeft:'1%', marginRight:'1%'}}>
        <View>
          <Text style={{fontSize: '20%'}}>Space Name</Text>
          <Text>## Users</Text>
        </View>
        {(leavejoin===0 && !isAdmin) && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => {setLeaveJoin(1)}}>
          <Text style={styles.leavejoinText}>join</Text>
        </TouchableOpacity>}
        {(leavejoin===1 && !isAdmin) && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => {setLeaveJoin(0)}}>
          <Text style={styles.leavejoinText}>leave</Text>
        </TouchableOpacity>}
        {isAdmin && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => {setLeaveJoin(2)}}>
          <Text style={styles.leavejoinText}>edit</Text>
        </TouchableOpacity>}
      </View>
      <View style={{flex: 0.5, marginLeft:'1%', marginRight:'1%'}} >
        <Text>space description. space description. space description. space description. </Text>
      </View>
      <View style={{flex: 0.4, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text style={[tab !== 0? styles.unselectedTab: styles.selectedTab]} onPress={() => {setTab(0)}}>FEED</Text>
        <Text style={[tab !== 1? styles.unselectedTab: styles.selectedTab]}onPress={() => {setTab(1)}}>GUIDELINES</Text>
        {isAdmin && <Text style={[tab !== 2? styles.unselectedTab: styles.selectedTab]}onPress={() => {setTab(2)}}>MEMBERS</Text>}
      </View >
      {/* {tab === 0 && <View style={{ flex: 8, backgroundColor: 'red'}} />} */}
      {tab === 0 && <View style={{ flex: 8 }} ><ConfessionList /></View>}
      {tab === 1 && <View style={{ flex: 8, backgroundColor: 'pink'}} />}
      {tab === 2 && <View style={{ flex: 8, backgroundColor: 'blue'}} />}
      <View style={{flex: 0.5, alignItems:'center'}}>
        <TouchableOpacity onPress={() => {setModalVisible(true)}}>
          <Icon name="md-create-outline" size='35%'/>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType='slide' style={{flex:1}}>
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <View style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => {setModalVisible(false)}}>
            <Icon name="md-close" size='35%'/>
            </TouchableOpacity>
            {/* <Button title='close'onPress={()=>{setModalVisible(false)}}/> */}
            <Text>Write a confession.</Text>
            <Button title='post'/>
          </View>
          <View style={{flex: 10}}>
            <TextInput style={{padding:10, backgroundColor:'pink',
        borderTopColor: '#000000',
        borderTopWidth: 1,}} multiline onChangeText={text => changeWriteConfession(text)} value={writeConfession} />
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
    backgroundColor: '#f0f8ff',
    // alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '98%'
  },
  selectedTab: {
    fontSize:'18%',
    textDecorationLine: 'underline'
  },
  unselectedTab: {
    fontSize:'18%'
  },
  leavejoinContainer:{
    // backgroundColor: "#009688",
    borderWidth:'1px',
    borderColor: "#009688",
    borderRadius: 10,
    paddingVertical: 9,
    // paddingHorizontal: 11,
    width:'20%'
  },
  leavejoinText: {
    fontSize: 16,
    color: "#009688",
    // fontWeight: "bold",
    alignSelf: "center",
    alignItems:'center'
  }
});

export default Space;