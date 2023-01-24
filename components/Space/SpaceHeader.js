import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Comments from './../Comments/Comments.js';
import ConfessionList from './../Confession/ConfessionList.js';
import GlobalStyles from './../GlobalStyles.js';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import MemberInfo from './MemberInfo.js';
import { useFonts } from 'expo-font';

const SpaceHeader = ({joinSpace, leaveSpace, setEditMode, username, space_name, numMembers }) => {

  const [fontsLoaded] = useFonts({
    Virgil: require('../../assets/fonts/Virgil.ttf'),
    FuzzyBubblesRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBubblesBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.space_name}>{space_name}</Text>
        <Text style={styles.numMembers}>{numMembers} {'Member(s)'}</Text>
      </View>
      {(leavejoin===0 && !isAdmin) && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => joinSpace(username, space_name)}>
        <Text style={styles.leavejoinText}>join</Text>
      </TouchableOpacity>}
      {(leavejoin===1 && !isAdmin) && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => leaveSpace(username, space_name)}>
        <Text style={styles.leavejoinText}>leave</Text>
      </TouchableOpacity>}
      {isAdmin && <TouchableOpacity style={styles.leavejoinContainer} onPress={() => {setEditMode(true)}}>
        <Text style={styles.leavejoinText}>edit</Text>
      </TouchableOpacity>}
    </View>
  )
}

export default SpaceHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:'1%',
    marginRight:'1%',
    paddingTop: '2%'
  },
  space_name:{
    fontSize: '20%',
    fontFamily:'FuzzyBubblesBold'
  },
  numMembers: {
    color: 'rgba(0,0,0,0.7)'
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

});