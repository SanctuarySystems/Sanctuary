import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import GlobalStyles from './../GlobalStyles.js';
import ConfessionList from './../Confession/ConfessionList.js';
import MemberInfo from './MemberInfo.js';

const SpaceWindow = ({tab, onRefresh, refreshing, spaceGuidelines, confessions, navigation, username, banUser, space_name, setModalVisible, spaceMembers}) => {

  return (
    <View style={styles.container}>
    {tab === 0 && <View style={styles.feedContainer} >
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ConfessionList allConfessions={confessions}isRoom={true} isHome={false}nav={navigation} />
      </ScrollView>
    </View>}
    {tab === 1 && <View style={styles.guidelinesContainer}><Text style={styles.spaceGuidelines}>{spaceGuidelines}</Text></View>}
    {tab === 2 && <View style={styles.membersContainer} >
      <ScrollView style={{paddingTop:'4%'}}>
      {spaceMembers.map((member) => <MemberInfo isUser={member===username}banUser={banUser} space_name={space_name} username={member}/>)}
      </ScrollView>
      </View>}
    {tab === 0 && <View style={styles.createConfessionContainer}>
      <TouchableOpacity onPress={() => {setModalVisible(true)}}>
        <Icon name="md-create-outline" size='35%' color='rgba(49, 94, 153, 1)'/>
      </TouchableOpacity>
    </View>}
  </View>
  )
};

export default SpaceWindow;

const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
  spaceGuidelines: {
    fontSize: 18,
    padding: 4,
    opacity: 0.7,
    fontFamily: 'FuzzyBubblesRegular',
  },
  guidelinesContainer: {
    flex: 8,
    paddingTop: 9,
  },
  feedContainer: {
    flex: 7.5,
    paddingTop: 9,
  },
  membersContainer: {
    flex: 8,
    paddingTop: 9,
    flexDirection:'column',
    alignItems: 'center',
    width:'100%'
  },
  createConfessionContainer: {
    flex: 0.5,
    alignSelf:'flex-end',
    marginBottom:'2%',
    paddingRight: '3%',
    marginTop: '1%'
  },
});