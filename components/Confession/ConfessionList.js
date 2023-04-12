import React, { useContext, useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { UsernameContext, apiUrl } from '../../App.js';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity, AsyncStorage, Modal, SafeAreaView } from 'react-native';
import axios from "axios";
import moment from 'moment';

const ConfessionList = ({ allConfessions, nav, isRoom, isHome }) => {
  const [huggedConfIds, setHuggedConfIds] = useState({});
  const { username, userToken } = useContext(UsernameContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Add line below to reset local storage
    // saveIdList({});
    getIdList().then(setHuggedConfIds);
  }, []);

  const saveIdList = async (data) => {
    try {
      await AsyncStorage.setItem(
        'huggedConfIds',
        JSON.stringify(data),
      );
    } catch (error) {
      // Error saving data
      console.log('Failed to save data in confessionsList');
    }
  };

  const getIdList = async () => {
    try {
      const huggedConfsJson = await AsyncStorage.getItem('huggedConfIds');
      return huggedConfsJson ? JSON.parse(huggedConfsJson) : {};
    } catch (error) {
      // Error retrieving data
      console.log('Failed to get data in confessionsList');
      return {};
    }
  };

  const handleReport = (confession_id, user) => {
    setShowModal(false);
    axios.patch(`${apiUrl}/confessions/${confession_id}/report/${user}`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .catch((error) => console.log(error));
  };

  const [fontsLoaded] = useFonts({
    'Virgil': require('../../assets/fonts/Virgil.ttf'),
    'FuzzyBubblesRegular': require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    'FuzzyBubblesBold': require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  const images = [
    require(`../../assets/avatars/001.png`),
    require(`../../assets/avatars/002.png`),
    require(`../../assets/avatars/003.png`),
    require(`../../assets/avatars/004.png`),
    require(`../../assets/avatars/005.png`),
    require(`../../assets/avatars/006.png`),
    require(`../../assets/avatars/007.png`),
    require(`../../assets/avatars/008.png`),
    require(`../../assets/avatars/009.png`),
    require(`../../assets/avatars/011.png`),
    require(`../../assets/avatars/012.png`),
    require(`../../assets/avatars/013.png`),
    require(`../../assets/avatars/014.png`),
    require(`../../assets/avatars/015.png`),
    require(`../../assets/avatars/016.png`),
    require(`../../assets/avatars/017.png`),
    require(`../../assets/avatars/018.png`),
    require(`../../assets/avatars/019.png`),
    require(`../../assets/avatars/020.png`),
    require(`../../assets/avatars/021.png`),
    require(`../../assets/avatars/022.png`),
    require(`../../assets/avatars/023.png`),
    require(`../../assets/avatars/024.png`),
    require(`../../assets/avatars/025.png`),
    require(`../../assets/avatars/026.png`),
    require(`../../assets/avatars/027.png`),
    require(`../../assets/avatars/028.png`),
    require(`../../assets/avatars/029.png`),
    require(`../../assets/avatars/030.png`),
    require(`../../assets/avatars/031.png`),
    require(`../../assets/avatars/032.png`),
    require(`../../assets/avatars/033.png`),

  ];

  if (allConfessions === undefined) {
    allConfessions = 'none';
  }

  function spaceNav(spaceName, owner) {
    let isAdmin;
    if (isHome) {
      if (owner === username) {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
      nav.navigate('Space', { username, admin: isAdmin, space_name: spaceName });
    }
  }

  function addHug(id) {
    axios.patch(`${apiUrl}/confessions/${id}/hug`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        const newIdList = { ...huggedConfIds, ...{ id } };
        saveIdList(newIdList);
        setHuggedConfIds(newIdList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Still loading font</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {allConfessions === 'none' && <Text style={styles.noConfText}>My confessionList Never got data pushed in. Please fix that.</Text>}
      {allConfessions.length === 0 && isRoom === false && <Text style={styles.noConfText}>There are no confessions to see in your home feed! Either join more groups or make a post!</Text>}
      {allConfessions.length === 0 && isRoom === true && <Text style={styles.noConfText}>There are no confessions in this room. Be the first to post!</Text>}
      {allConfessions !== 'none' && allConfessions.length !== 0 && (
      <FlatList
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
                  <Entypo name="dots-three-horizontal" size={20} color="black" onPress={() => setShowModal(true)} />
                </View>
              </View>

              <View style={styles.imgUserContainer}>
                <Image source={images[(Number(item.conf_creator_avatar) - 1)]} style={styles.image}/>
                <Text style={styles.textStyle}>{'  ' + item.created_by}</Text>
              </View>
              <Text style={styles.bodyText}>{item.confession}</Text>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonStyleHug}>
                {huggedConfIds[item.confession_id] === undefined && <TouchableOpacity
                  onPress={() => addHug(item.confession_id)}>
                  <Text style={{textAlign: 'center'}}><FontAwesome5 name="hands-helping" size={26} />{' ' + item.hugs}</Text>
                </TouchableOpacity>}
                {huggedConfIds[item.confession_id] !== undefined && <View>
                  <Text style={{textAlign: 'center', color: 'rgba(49, 94, 153, 1)'}}><FontAwesome5 name="hands-helping" size={26} color="rgba(49, 94, 153, 1)" />{' ' + (item.hugs + 1)}</Text>

                  </View>}
                </View>
              <View style={styles.buttonStyleComment}>
                {(!isRoom) && <TouchableOpacity
                  onPress={() => nav.navigate('Comments', {confession_id: item.confession_id, item: item, image: images[(Number(item.conf_creator_avatar) - 1)]})}>
                  <Text style={{textAlign: 'center'}}><FontAwesome5 name="comments" size={26} />{' ' + item.comments.length}</Text>

                </TouchableOpacity> }
                {isRoom && <TouchableOpacity
                onPress={() => nav.navigate('Comments', {confession_id: item.confession_id, item: item, image: images[(Number(item.conf_creator_avatar) - 1)]})}>
                <Text style={{textAlign: 'center'}}><FontAwesome5 name="comments" size={26} />{' ' + item.comments.length}</Text>
                </TouchableOpacity>}
              </View>
              </View>
            </View>
            <Modal styles={styles.modal} visible={showModal} animationType='slide' transparent>
              <TouchableOpacity style={styles.closeModalArea} onPress={() => setShowModal(false)} />
              <TouchableOpacity style={styles.viewModal} onPress={() => setShowModal(false)}>
                <SafeAreaView style={styles.report} onPress={() => setShowModal(false)}>
                  <TouchableOpacity style={styles.reportButton} onPressOut={() => handleReport(item.confession_id, username)}>
                    <Text style={styles.reportText}>Report</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </TouchableOpacity>
            </Modal>
          </View>
        )}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(254, 241 , 230, .8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    fontFamily: 'Virgil',
  },

  errorText: {
    fontSize: 22,
    // fontWeight: 'bold',
    fontFamily: 'FuzzyBubblesRegular',
    color: 'rgba(27, 52, 83, 1)',
  },
  noConfText: {
    padding: 19,
    fontSize: 19,
    fontFamily:"FuzzyBubblesRegular",
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
    width: '100%',
  },

  containerPost: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  roomDateContainer: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(27, 52, 83, .08)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontFamily: 'Virgil',

  },
  imgUserContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    // backgroundColor: 'rgba(27, 52, 83, .08)',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    fontFamily: 'Virgil',
  },
  image: {
    width: 20,
    height: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: '1%',
    justifyContent: 'space-between',
    fontFamily: 'Virgil',
  },
  buttonStyleHug: {
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderColor: 'rgba(27, 52, 83, .1)',
    fontFamily: 'Virgil',
    paddingLeft: 100,
  },
  buttonStyleComment: {
    borderWidth: 0,
    alignItems: 'center',
    fontFamily: 'Virgil',
    paddingRight: 100,
  },

  roomNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(27, 52, 83, 1)',
    // fontFamily: 'Times New Roman'
  },

  textStyle: {
    fontSize: 16,
    paddingBottom: 8,
    fontWeight: 'bold',
    // color: 'rgba(27, 52, 83, 1)',
    color: 'rgba(49, 94, 153, 1)',
    // fontFamily: 'Times New Roman'
  },

  dateStyle: {
    fontStyle: 'italic',
    fontSize: 12,
    paddingTop: '1%',
    color: 'rgba(49, 94, 153, 1)',
    // fontFamily: 'Times New Roman'
  },
  bodyText: {
    color: 'black',
    fontSize: 20,
    padding: '3%',
    fontFamily: 'FuzzyBubblesRegular',
    flexWrap: 'wrap',
  },
  threeDots: {
    fontSize: 20,
    textAlign: 'right',
  },
  modal: {
    backgroundColor: 'red',
    fontFamily: 'BubbleRegular',
    flex: 1,
    height: '100%',
  },
  viewModal: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
    height: '100%',
    fontFamily: 'BubbleRegular',
    flex: 0.2,
  },
  report: {
    width: '100%',
    marginTop: 'auto',
    height: '100%',
    backgroundColor: '#EDF6F9',
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontFamily: 'BubbleRegular',
  },
  reportButton: {
    marginTop: 10,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '4%',
    backgroundColor: '#C44536',
    borderRadius: 10,
    alignItems: 'center',
    fontFamily: 'BubbleRegular',
  },
  closeModalArea: {
    flex: 0.8,
  },
  reportText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ConfessionList;