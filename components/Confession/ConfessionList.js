import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from 'react-native';

export default function ConfessionList() {

  const mockData = [
    {
      id: 1,
      date: '5 hours ago',
      text: 'I have crippling depression.',
      roomName: 'SadBoi Hours',
      username: 'theguy58',
      hugs: 22,
      comments: 3
    },
    {
      id: 2,
      date: '2 hours ago',
      text: 'I need to use the toilet.',
      roomName: 'MonsterDrinkersUSA',
      username: 'determinesupporter',
      hugs: 19,
      comments: 1
    },
    {
      id: 3,
      date: '16 minutes ago',
      text: 'She folded her handkerchief neatly. Nothing is as cautiously cuddly as a pet porcupine. Two more days and all his problems would be solved.',
      roomName: 'SadBoi Hours',
      username: 'foglarboard',
      hugs: 92,
      comments: 31
    },
    {
      id: 4,
      date: '5 days ago',
      text: 'Its a skateboarding penguin with a sunhat! I ate a mushrooom from my backyard and its actually really chill',
      roomName: 'homeguysgroup',
      username: 'cameodd',
      hugs: 272,
      comments: 44
    },
    {
      id: 5,
      date: '16 hours ago',
      text: 'I need to use the toilet.',
      roomName: 'CHEESELOVERS',
      username: 'polodrab',
      hugs: 1,
      comments: 0
    },
    {
      id: 6,
      date: '1 hour ago',
      text: 'I need to use the toilet.',
      roomName: 'SadBoi Hours',
      username: 'starchuffer',
      hugs: 14,
      comments: 3
    },
    {
      id: 7,
      date: '51 minutes ago',
      text: 'I need to use the toilet.',
      roomName: 'CHEESELOVERS',
      username: 'tendonvariable12',
      hugs: 2,
      comments: 2
    },
    {
      id: 8,
      date: '5 hours ago',
      text: 'Guys im addicted to getting comments on my posts! Please spam comments on my post to see excatly how many we can get! Come on it will be very very fun!',
      roomName: 'Mapinguari',
      username: 'besiegebathingsuit9',
      hugs: 77,
      comments: 6793
    },
    {
      id: 9,
      date: '10 hours ago',
      text: 'I need to use the toilet.',
      roomName: 'Chittagong',
      username: 'pandafirst',
      hugs: 22,
      comments: 3
    },
    {
      id: 10,
      date: '2 weeks ago',
      text: 'I need to use the toilet.',
      roomName: 'Redcap',
      username: 'airplaneorigin',
      hugs: 121,
      comments: 99
    },


  ];

  return (
      <View style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

        <View style={styles.containerConfess}>
          <View style={styles.containerPost}>
            <Text>I love Beans!</Text>
            <Text>It has a high source of protein</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonStyle}>
              <Button
                title="Like"
                color="red"
                accessibilityLabel="Learn more about this purple button"/>
            </View>
            <View style={styles.buttonStyle}>
              <Button
                title="Comment"
                color="red"
                accessibilityLabel="Learn more about this purple button"/>
            </View>
          </View>
        </View>
      </ScrollView> */}

      <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      data={mockData}
      renderItem={({ item }) => (
        <View style={styles.containerConfess}>
          <View style={styles.containerPost}>
            <View style={styles.roomDateContainer}>
              <View style={{width:'90%', flexDirection: 'row'}}>
                <Text style={styles.roomNameStyle}>{item.roomName + ' '}</Text>
                <Text style={styles.dateStyle}>{item.date}</Text>
              </View>
              <View style={{width: '10%'}}>
                <Text style={styles.threeDots}>...</Text>
              </View>
            </View>
            <Text style={styles.textStyle}>{item.username}</Text>
            <Text>{item.text}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonStyleHug}>
              <Button
                title={'Hug ' + item.hugs}
                color="blue"
                accessibilityLabel="Learn more about this purple button"/>
            </View>
            <View style={styles.buttonStyleComment}>
              <Button
                title={"Comment " + item.comments}
                color="blue"
                accessibilityLabel="Learn more about this purple button"/>
            </View>
          </View>
        </View>
      )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0
  },

  containerConfess: {
    borderWidth: 0,
    backgroundColor: '#fff',
    borderColor: 'black',
    marginTop: '1.5%',
    marginBottom: '1.5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },

  containerPost: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },

  buttonContainer: {
    flexDirection: 'row',
  },

  roomDateContainer: {
    flexDirection: 'row',
  },

  buttonStyleHug: {
    borderWidth: 0,
    width: '50%'
  },

  buttonStyleComment: {
    borderWidth: 0,
    width: '50%'
  },

  roomNameStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  textStyle: {
    fontSize: 16,
    paddingBottom: 8
  },

  dateStyle: {
    fontStyle: 'italic',
    fontSize: 12,
    paddingTop: '.5%'
  },

  threeDots: {
    fontSize: 20,
    textAlign: 'right'
  }


});
