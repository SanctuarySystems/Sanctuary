import React, { useContext } from 'react';
import { useFonts } from 'expo-font';
import { UsernameContext } from "../../App.js";
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

export default function ConfessionList({ allConfessions, nav, isRoom, isHome}) {

  const [fontsLoaded] = useFonts({
    'Virgil': require('../../assets/fonts/Virgil.ttf'),
  });

  const { username } = useContext(UsernameContext);
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

  function spaceNav(spaceName, owner) {

    var isAdmin;
    if (isHome) {

      if (owner === username) {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
      nav.navigate('Home Space', {username: username, admin: isAdmin, space_name: spaceName});
    }
  }


  if (!fontsLoaded) {

    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  } else {

  return (
    <View style={styles.container}>
      {allConfessions === 'none' && <Text style={styles.errorText}>My confessionList Never got data pushed in. Please fix that.</Text>}
      {allConfessions.length === 0 && isRoom === false && <Text style={styles.errorText}>There are no confessions to see in your home feed! Either join more groups or make a post!</Text>}
      {allConfessions.length === 0 && isRoom === true && <Text style={styles.errorText}>There are no confessions in this room. Be the first to post!</Text>}
      {allConfessions !== 'none' && allConfessions.length !== 0 && <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.confession_id}
        data={allConfessions}
        renderItem={({ item }) => (
          <View style={styles.containerConfess}>
            <View style={styles.containerPost}>
              <View style={styles.roomDateContainer}>
                <View style={{ width: '90%', flexDirection: 'row' }}>
                  <Text style={styles.roomNameStyle}
                    onPress={() => spaceNav(item.space_name, item.space_creator)}
                  >{item.space_name + ' '}</Text>
                  <Text style={styles.dateStyle}>{moment(item.createdAt).fromNow()}</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Entypo name="dots-three-horizontal" size={20} color="black" />
                </View>
              </View>

            <View style={styles.imgUserContainer}>
            <Image source={images[1]} style={styles.image}/>
            <Text style={styles.textStyle}>{'  ' + item.created_by}</Text>
            </View>
              <Text style={styles.bodyText}>{item.confession}</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleHug}>
                <TouchableOpacity
                  onPress={() => console.log('yay')}>
                  <Text style={{textAlign: 'center'}}><FontAwesome5 name="hands-helping" size={20} color="rgba(27, 52, 83, 1)" />{' ' + item.hugs}</Text>
                  <Text style={{fontFamily: 'Virgil'}}>Hugs</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonStyleComment}>
                {(!isRoom) && <TouchableOpacity
                  onPress={() => nav.navigate('Comments', {confession_id: item.confession_id})}>
                  <Text style={{textAlign: 'center'}}><FontAwesome5 name="comments" size={20} color="rgba(27, 52, 83, 1)" />{' ' + item.comments.length}</Text>
                  <Text style={{fontFamily: 'Virgil'}}>Comments</Text>
                </TouchableOpacity> }
                {isRoom && <TouchableOpacity
                onPress={() => nav.navigate('Confession Comments', {confession_id: item.confession_id})}>
                <Text style={{textAlign: 'center'}}><FontAwesome5 name="comments" size={20} color="rgba(27, 52, 83, 1)" />{' ' + item.comments.length}</Text>
                <Text>Comments</Text>
                </TouchableOpacity>}
              </View>
              </View>
            </View>
          </View>
        )}
      />}

    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(254, 241 , 230, .8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    fontFamily: 'Virgil'
  },

  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(27, 52, 83, 1)',

  },
  containerConfess: {
    borderWidth: 0,
    // backgroundColor: 'rgba(144, 170 , 203, .2)',
    backgroundColor: 'rgba(255, 255, 255, .85)',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(27, 52, 83, .08)',
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
    paddingTop: '2%',
    fontFamily: 'Virgil'
  },

  roomDateContainer: {
    flexDirection: 'row',
   // backgroundColor: 'rgba(27, 52, 83, .08)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontFamily: 'Virgil'

  },
  imgUserContainer: {
    flexDirection: 'row',
    borderWidth: 0,
  //  backgroundColor: 'rgba(27, 52, 83, .08)',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    fontFamily: 'Virgil'
  },
  image: {
    width: 20,
    height: 20
  },
  buttonStyleHug: {
    borderWidth: 0,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(27, 52, 83, .1)',
    paddingTop: '1%',
    fontFamily: 'Virgil'
  },

  buttonStyleComment: {
    borderWidth: 0,
    width: '50%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(27, 52, 83, .1)',
    paddingTop: '1%',
    fontFamily: 'Virgil'
  },

  roomNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(27, 52, 83, 1)',
    fontFamily: 'Virgil'
  },

  textStyle: {
    fontSize: 16,
    paddingBottom: 8,
    color: 'rgba(27, 52, 83, 1)',
    fontFamily: 'Virgil'
  },

  dateStyle: {
    fontStyle: 'italic',
    fontSize: 12,
    paddingTop: '1%',
    color: 'rgba(49, 94, 153, 1)',
    fontFamily: 'Virgil'
  },
  bodyText: {
    color: 'rgba(49, 94, 153, 1)',
    fontSize: 18,
    padding: '3%',
    fontFamily: 'Virgil'
  },

  threeDots: {
    fontSize: 20,
    textAlign: 'right'
  }


});
