import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';

export default function ConfessionList({ allConfessions, nav, isRoom, isHome}) {

  console.log('Here is the data', allConfessions);
  const images = [
    require(`../../assets/avatar/001.png`),
    require(`../../assets/avatar/002.png`),
    require(`../../assets/avatar/003.png`),
    require(`../../assets/avatar/004.png`),
    require(`../../assets/avatar/005.png`),
    require(`../../assets/avatar/006.png`),
    require(`../../assets/avatar/007.png`),
    require(`../../assets/avatar/008.png`),
    require(`../../assets/avatar/009.png`),
    require(`../../assets/avatar/011.png`),
    require(`../../assets/avatar/012.png`),
    require(`../../assets/avatar/013.png`),
    require(`../../assets/avatar/014.png`),
    require(`../../assets/avatar/015.png`),
    require(`../../assets/avatar/016.png`),
    require(`../../assets/avatar/017.png`),
    require(`../../assets/avatar/018.png`),
    require(`../../assets/avatar/019.png`),
    require(`../../assets/avatar/020.png`),
    require(`../../assets/avatar/021.png`),
    require(`../../assets/avatar/022.png`),
    require(`../../assets/avatar/023.png`),
    require(`../../assets/avatar/024.png`),
    require(`../../assets/avatar/025.png`),
    require(`../../assets/avatar/026.png`),
    require(`../../assets/avatar/027.png`),
    require(`../../assets/avatar/028.png`),
    require(`../../assets/avatar/029.png`),
    require(`../../assets/avatar/030.png`),
    require(`../../assets/avatar/031.png`),
    require(`../../assets/avatar/032.png`),
    require(`../../assets/avatar/033.png`),

  ];

  if (allConfessions === undefined) {
    allConfessions = 'none';
  }
  // const mockData = [
  //   {
  //     id: 1,
  //     date: '5 hours ago',
  //     text: 'I have crippling depression.',
  //     roomName: 'SadBoi Hours',
  //     username: 'theguy58',
  //     hugs: 22,
  //     comments: 3
  //   },
  //   {
  //     id: 2,
  //     date: '2 hours ago',
  //     text: 'I need to use the toilet.',
  //     roomName: 'MonsterDrinkersUSA',
  //     username: 'determinesupporter',
  //     hugs: 19,
  //     comments: 1
  //   },
  //   {
  //     id: 3,
  //     date: '16 minutes ago',
  //     text: 'She folded her handkerchief neatly. Nothing is as cautiously cuddly as a pet porcupine. Two more days and all his problems would be solved.',
  //     roomName: 'SadBoi Hours',
  //     username: 'foglarboard',
  //     hugs: 92,
  //     comments: 31
  //   },
  //   {
  //     id: 4,
  //     date: '5 days ago',
  //     text: 'Its a skateboarding penguin with a sunhat! I ate a mushrooom from my backyard and its actually really chill',
  //     roomName: 'homeguysgroup',
  //     username: 'cameodd',
  //     hugs: 272,
  //     comments: 44
  //   },
  //   {
  //     id: 5,
  //     date: '16 hours ago',
  //     text: 'I need to use the toilet.',
  //     roomName: 'CHEESELOVERS',
  //     username: 'polodrab',
  //     hugs: 1,
  //     comments: 0
  //   },
  //   {
  //     id: 6,
  //     date: '1 hour ago',
  //     text: 'I need to use the toilet.',
  //     roomName: 'SadBoi Hours',
  //     username: 'starchuffer',
  //     hugs: 14,
  //     comments: 3
  //   },
  //   {
  //     id: 7,
  //     date: '51 minutes ago',
  //     text: 'I need to use the toilet.',
  //     roomName: 'CHEESELOVERS',
  //     username: 'tendonvariable12',
  //     hugs: 2,
  //     comments: 2
  //   },
  //   {
  //     id: 8,
  //     date: '5 hours ago',
  //     text: 'Guys im addicted to getting comments on my posts! Please spam comments on my post to see excatly how many we can get! Come on it will be very very fun!',
  //     roomName: 'Mapinguari',
  //     username: 'besiegebathingsuit9',
  //     hugs: 77,
  //     comments: 6793
  //   },
  //   {
  //     id: 9,
  //     date: '10 hours ago',
  //     text: 'I need to use the toilet.',
  //     roomName: 'Chittagong',
  //     username: 'pandafirst',
  //     hugs: 22,
  //     comments: 3
  //   },
  //   {
  //     id: 10,
  //     date: '2 weeks ago',
  //     text: 'I need to use the toilet.',
  //     roomName: 'Redcap',
  //     username: 'airplaneorigin',
  //     hugs: 121,
  //     comments: 99
  //   },


  // ];

  const spaceNav = () => {

    if (isHome) {
      nav.navigate('Home Space', {username: 'lookingforpeace', admin: true, space_name: 'tranquility'});
    }
  }

  return (
      <View style={styles.container}>
        {allConfessions === 'none' && <Text style={styles.errorText}>My confessionList Never got data pushed in. Please fix that.</Text>}
        {allConfessions.length === 0 && <Text style={styles.errorText}>You're not apart of a Space! Join a Space</Text>}
      {allConfessions !== 'none' && allConfessions.length !== 0 && <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.confession_id}
      data={allConfessions}
      renderItem={({ item }) => (
        <View style={styles.containerConfess}>
          <View style={styles.containerPost}>
            <View style={styles.roomDateContainer}>
              <View style={{width:'90%', flexDirection: 'row'}}>
                <Text style={styles.roomNameStyle}
                onPress={() => spaceNav()}
                >{item.space_name + ' '}</Text>
                <Text style={styles.dateStyle}>{item.createdAt}</Text>
              </View>
              <View style={{width: '10%'}}>
                <Text style={styles.threeDots}>...</Text>
              </View>
            </View>
            <View style={styles.imgUserContainer}>
            <Image source={images[1]} style={styles.image}/>
            <Text style={styles.textStyle}>{'  ' + item.space_creator}</Text>
            </View>
            <Text style={styles.bodyText}>{item.confession}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonStyleHug}>
              <Button
                title={'Hug ' + item.hugs}
                color="rgba(27, 52, 83, 1)"
                accessibilityLabel="Learn more about this purple button"/>
            </View>
            <View style={styles.buttonStyleComment}>
              {(!isRoom) && <Button
                title={"Comments " + item.comments.length}
                color="rgba(27, 52, 83, 1)"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => nav.navigate('Comments', {confession_id: item.confession_id})}/>}
              {isRoom && <Button
                title={"Comments " + item.comments.length}
                color="rgba(27, 52, 83, 1)"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => nav.navigate('Confession Comments', {confession_id: item.confession_id})}/>}
            </View>
          </View>
        </View>
      )}
      /> }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(254, 241 , 230, .8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0
  },

  errorText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(27, 52, 83, 1)',
    width: '80%',

  },
  containerConfess: {
    borderWidth: 0,
    // backgroundColor: 'rgba(144, 170 , 203, .2)',
    backgroundColor: 'rgba(255, 255, 255, .85)',
    borderColor: 'black',
    borderRadius: 10,
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
  imgUserContainer: {
    flexDirection: 'row',
    borderWidth: 0
  },
  image: {
    width: 20,
    height: 20
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
    fontWeight: 'bold',
    color: 'rgba(27, 52, 83, 1)'
  },

  textStyle: {
    fontSize: 16,
    paddingBottom: 8,
    color: 'rgba(27, 52, 83, 1)'
  },

  dateStyle: {
    fontStyle: 'italic',
    fontSize: 12,
    paddingTop: '.5%',
    color: 'rgba(49, 94, 153, 1)'
  },
  bodyText: {
    color: 'rgba(49, 94, 153, 1)'
  },

  threeDots: {
    fontSize: 20,
    textAlign: 'right'
  }


});
