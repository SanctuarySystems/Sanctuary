import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useFonts } from 'expo-font';
import GlobalStyles from './../GlobalStyles.js';

const SpaceTabs = ({tab, isAdmin, setTab}) => {

  return (
  <View style={styles.container}>
    <View style={[tab !== 0? styles.unselectedTabView: styles.selectedTabView]}><Text style={[tab !== 0? styles.unselectedTab: styles.selectedTab]} onPress={() => {setTab(0)}}>Feed</Text></View>
    <View style={[tab !== 1? styles.unselectedTabView: styles.selectedTabView]}><Text style={[tab !== 1? styles.unselectedTab: styles.selectedTab]}onPress={() => {setTab(1)}}>Guidelines</Text></View>
    {isAdmin && <View style={[tab !== 2? styles.unselectedTabView: styles.selectedTabView]}><Text style={[tab !== 2? styles.unselectedTab: styles.selectedTab]}onPress={() => {setTab(2)}}>Members</Text></View>}
  </View >

  )
};

export default SpaceTabs;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  selectedTab: {
    fontSize:'18%',
    textDecorationThickness: '2%',
    color: 'rgba(49, 94, 153, 1)',
    fontWeight: 'bold',
  },
  selectedTabView: {
    borderBottomWidth: '3px',
    borderBottomColor: 'rgba(49, 94, 153, 1)',
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
});

