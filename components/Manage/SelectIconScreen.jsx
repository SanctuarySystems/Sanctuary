import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Image, Button, StyleSheet, FlatList, Animated, Text } from 'react-native';
import { VscCircleLargeOutline } from "react-icons/vsc";
import { MdCheckCircle } from "react-icons/md";
import axios from 'axios';
import { UsernameContext } from "../../App.js";

const SelectIconScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const {username, setUsername} = useContext(UsernameContext);
  let currentSelect = 1;

  console.log('!!!username ', username);

  const images = [
    { id: 1, img: require(`../../assets/avatars/001.png`), animate: new Animated.Value(0) },
    { id: 2, img: require(`../../assets/avatars/002.png`), animate: new Animated.Value(0) },
    { id: 3, img: require(`../../assets/avatars/003.png`), animate: new Animated.Value(0) },
    { id: 4, img: require(`../../assets/avatars/004.png`), animate: new Animated.Value(0) },
    { id: 5, img: require(`../../assets/avatars/005.png`), animate: new Animated.Value(0) },
    { id: 6, img: require(`../../assets/avatars/006.png`), animate: new Animated.Value(0) },
    { id: 7, img: require(`../../assets/avatars/007.png`), animate: new Animated.Value(0) },
    { id: 8, img: require(`../../assets/avatars/008.png`), animate: new Animated.Value(0) },
    { id: 9, img: require(`../../assets/avatars/009.png`), animate: new Animated.Value(0) },
    { id: 10, img: require(`../../assets/avatars/010.png`), animate: new Animated.Value(0) },
    { id: 11, img: require(`../../assets/avatars/011.png`), animate: new Animated.Value(0) },
    { id: 12, img: require(`../../assets/avatars/012.png`), animate: new Animated.Value(0) },
    { id: 13, img: require(`../../assets/avatars/013.png`), animate: new Animated.Value(0) },
    { id: 14, img: require(`../../assets/avatars/014.png`), animate: new Animated.Value(0) },
    { id: 15, img: require(`../../assets/avatars/015.png`), animate: new Animated.Value(0) },
    { id: 16, img: require(`../../assets/avatars/016.png`), animate: new Animated.Value(0) },
    { id: 17, img: require(`../../assets/avatars/017.png`), animate: new Animated.Value(0) },
    { id: 18, img: require(`../../assets/avatars/018.png`), animate: new Animated.Value(0) },
    { id: 19, img: require(`../../assets/avatars/019.png`), animate: new Animated.Value(0) },
    { id: 20, img: require(`../../assets/avatars/020.png`), animate: new Animated.Value(0) },
    { id: 21, img: require(`../../assets/avatars/021.png`), animate: new Animated.Value(0) },
    { id: 22, img: require(`../../assets/avatars/022.png`), animate: new Animated.Value(0) },
    { id: 23, img: require(`../../assets/avatars/023.png`), animate: new Animated.Value(0) },
    { id: 24, img: require(`../../assets/avatars/024.png`), animate: new Animated.Value(0) },
    { id: 25, img: require(`../../assets/avatars/025.png`), animate: new Animated.Value(0) },
    { id: 26, img: require(`../../assets/avatars/026.png`), animate: new Animated.Value(0) },
    { id: 27, img: require(`../../assets/avatars/027.png`), animate: new Animated.Value(0) },
    { id: 28, img: require(`../../assets/avatars/028.png`), animate: new Animated.Value(0) },
    { id: 29, img: require(`../../assets/avatars/029.png`), animate: new Animated.Value(0) },
    { id: 30, img: require(`../../assets/avatars/030.png`), animate: new Animated.Value(0) },
    { id: 31, img: require(`../../assets/avatars/031.png`), animate: new Animated.Value(0) },
    { id: 32, img: require(`../../assets/avatars/032.png`), animate: new Animated.Value(0) },
    { id: 33, img: require(`../../assets/avatars/033.png`), animate: new Animated.Value(0) },
  ];

  //  const largeAnim = new Animated.Value(0);
  const interList = [];

  for (let i = 0; i < images.length; i++) {
    interList[i] = {};
    interList[i].imgA = images[i].animate.interpolate({
      inputRange: [0, 1],
      outputRange: ["85%", "100%"],
    });
    interList[i].bgA = images[i].animate.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(111, 255, 190, 0)", "rgba(111, 255, 190, 0.8)"],
    });
  }

  const goBig = (id) => {
    // Will change largeAnim value to 5 in .5 seconds
    Animated.timing(images[id - 1].animate, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const goSmall = (id) => {
    // Will change largeAnim value to 15 in .5 seconds
    Animated.timing(images[id - 1].animate, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const selectAvatar = (id) => {
    goSmall(currentSelect);
    goBig(id);
    currentSelect = id;
    // setSelected(id);
  };

  const handleSubmit = (image) => {
    console.log('hello', image);
    axios.post('http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users', {
      username,
      avater: image,
    })
      .then(() => {
        navigation.navigate('Home Screen');
      });
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Select an Avatar</Text>
      <View style={styles.grid}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={images}
          numColumns={3}
          renderItem={({ item }) => (
            <Animated.View style={
              [styles.imageContainer,
                { backgroundColor: interList[item.id - 1].bgA }]
            }
            >
              <TouchableOpacity
                key={item.id}
                onPress={() => selectAvatar(item.id)}
              >
                <Animated.Image source={item.img}
                  resizeMode='contain'
                  style={[styles.image, {
                    width: interList[item.id - 1].imgA,
                    height: interList[item.id - 1].imgA,
                  }]}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        />
        <View style={styles.submitContainer}>
          <Button
            title="Save Changes"
            color="rgba(77, 131, 203, 0.8)"
            onPress={() => {
              if (selected !== null) {
                console.log(currentSelect);
                handleSubmit(images[selected]);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(254, 241 , 230, 1)',
  },
  grid: {
    width: '90%',
    height: '90%',
  },
  imageContainer: {
    width: '33%',
    height: 120,
    borderWidth: 0,
    borderRadius: 20,
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  submitContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 176, 133, 1)',
    borderRadius: '10',
  },
  title: {
    width: '100%',
    color: 'rgba(144, 170 ,203, 1)',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 5,
  },
});

export default SelectIconScreen;