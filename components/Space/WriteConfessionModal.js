import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import GlobalStyles from './../GlobalStyles.js';

const WriteConfessionModal = ({modalVisible, setModalVisible, disablePost, writeConfession, changeWriteConfession, createConfession, username, space_name}) => {
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
    <Modal visible={modalVisible} animationType='slide' style={styles.modalContainer}>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View style={styles.viewContainer}>
          <TouchableOpacity onPress={() => { setModalVisible(false); }}>
            <Icon name="md-close" size='35%' color='rgba(49, 94, 153, 1)' />
          </TouchableOpacity>
          {/* <Button title='close'onPress={()=>{setModalVisible(false)}}/> */}
          <Text style={styles.writeConfessionText}>Write a confession.</Text>
          <TouchableOpacity disabled={disablePost} style={[disablePost ?styles.leavejoinContainerOpaque:styles.leavejoinContainer]} onPress={() => createConfession(username, writeConfession, space_name )}>
            <Text style={styles.leavejoinText}>post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput placeholder="Write your confession here." style={styles.writeConfessionTextInput} multiline onChangeText={text => {changeWriteConfession(text)}} value={writeConfession} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default WriteConfessionModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fef1e6',
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fef1e6',
    paddingRight: '2%',
    paddingLeft: '2%',
  },
  writeConfessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(49, 94, 153, 1)',
  },
  textInputContainer: {
    flex: 10,
  },
  writeConfessionTextInput: {
    padding: 10,
    borderTopColor: 'rgba(49, 94, 153, 1)',
    fontFamily: 'FuzzyBubblesRegular',
    borderTopWidth: 2,
    fontSize: 20,
  },
  leavejoinText: {
    fontSize: 14,
    color: "rgba(49, 94, 153, 1)",
    // fontWeight: "bold",
    alignSelf: "center",
    alignItems: 'center',
  },
  leavejoinContainerOpaque: {
    // backgroundColor: "#009688",
    borderWidth: '1px',
    borderColor: "rgba(49, 94, 153, 1)",
    borderRadius: 10,
    paddingVertical: 7,
    marginTop: 2,
    // paddingHorizontal: 11,
    width: '20%',
    opacity: 0.5,
  },
  leavejoinContainer: {
    // backgroundColor: "#009688",
    borderWidth: '1px',
    borderColor: "rgba(49, 94, 153, 1)",
    borderRadius: 10,
    paddingVertical: 7,
    marginTop: 2,
    // paddingHorizontal: 11,
    width: '20%',
  },

});