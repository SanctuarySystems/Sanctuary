import React, { useContext } from 'react';
import { UsernameContext } from "../../App.js";
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';

export default function ConfessionList({ allConfessions, nav, isRoom }) {
  const username = useContext(UsernameContext);
  console.log('Here is the data', allConfessions);
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

  const spaceNav = (spaceName) => {

    if (isRoom) {
      nav.navigate('Home Space', { username: username, isAdmin: true, space_name: spaceName });
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
                <View style={{ width: '90%', flexDirection: 'row' }}>
                  <Text style={styles.roomNameStyle}
                    onPress={() => spaceNav(item.space_name)}
                  >{item.space_name + ' '}</Text>
                  <Text style={styles.dateStyle}>{item.createdAt}</Text>
                </View>
                <View style={{ width: '10%' }}>
                  <Text style={styles.threeDots}>...</Text>
                </View>
              </View>
              <View style={styles.imgUserContainer}>
                <Image source={images[1]} style={styles.image} />
                <Text style={styles.textStyle}>{'  ' + item.space_creator}</Text>
              </View>
              <Text style={styles.bodyText}>{item.confession}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleHug}>
                <Button
                  title={'Hug ' + item.hugs}
                  color="rgba(27, 52, 83, 1)"
                  accessibilityLabel="Learn more about this purple button" />
              </View>
              <View style={styles.buttonStyleComment}>
                <Button
                  title={"Comments " + item.comments.length}
                  color="rgba(27, 52, 83, 1)"
                  accessibilityLabel="Learn more about this purple button"
                  onPress={() => nav.navigate('Comments', { confession_id: item.confession_id })} />
              </View>
            </View>
          </View>
        )}
      />}

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
