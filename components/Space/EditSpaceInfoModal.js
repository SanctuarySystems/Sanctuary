import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import GlobalStyles from './../GlobalStyles.js';

const EditSpaceInfoModal = ({ editMode, setEditMode, disableEdit, updateSpaceDetails, editSpaceDescription, editSpaceGuidelines, setEditSpaceDescription, setEditSpaceGuidelines }) => {
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
    <Modal visible={editMode} animationType='slide' style={styles.modalContainer}>
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={styles.viewContainer}>
        <TouchableOpacity onPress={() => {setEditMode(false)}}>
        <Icon name="md-close" size='35%' color='rgba(49, 94, 153, 1)'/>
        </TouchableOpacity>
        {/* <Button title='close'onPress={()=>{setModalVisible(false)}}/> */}
        <Text style={styles.headerText}>Edit Space Information</Text>
        <TouchableOpacity disabled={disableEdit} style={[disableEdit ?styles.leavejoinContainerOpaque:styles.leavejoinContainer]} onPress={() => updateSpaceDetails(editSpaceDescription, editSpaceGuidelines.split('\n'))}>
          <Text style={styles.leavejoinText}>update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.editDescriptionContainer}>
        <Text style={styles.editDescriptionTitle}>Edit Description:</Text>
        <TextInput style={styles.editDescriptionTextInput} multiline onChangeText={text => setEditSpaceDescription(text)} value={editSpaceDescription} />
      </View>
      <View style={styles.editGuidelinesContainer}>
        <Text style={styles.editGuidelinesTitle}>Edit Guidelines:</Text>
        <TextInput style={styles.editGuidelinesTextInput} multiline onChangeText={text => setEditSpaceGuidelines(text)} value={editSpaceGuidelines} />
      </View>
    </SafeAreaView>
  </Modal>

  )
};

export default EditSpaceInfoModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '2%',
    marginRight: '2%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(49, 94, 153, 1)',
  },
  leavejoinText: {
    fontSize: 14,
    color: "rgba(49, 94, 153, 1)",
    // fontWeight: "bold",
    alignSelf: "center",
    alignItems: 'center',
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
  editDescriptionContainer: {
    flex: 2,
  },
  editDescriptionTitle: {
    fontSize: 20,
    color: 'rgba(49, 94, 153, 1)',
    paddingLeft: '4%',
  },
  editDescriptionTextInput: {
    padding: 10,
    fontSize: 16,
    paddingLeft: '5%',
    borderTopColor: 'rgba(49, 94, 153, 1)',
    borderTopWidth: 1,
  },
  editGuidelinesContainer: {
    flex: 11,
  },
  editGuidelinesTitle: {
    fontSize: 20,
    color: 'rgba(49, 94, 153, 1)',
    paddingLeft: '4%',
  },
  editGuidelinesTextInput: {
    padding: 10,
    fontSize: 18,
    paddingLeft: '5%',
    fontFamily: 'FuzzyBubblesRegular',
    borderTopColor: 'rgba(49, 94, 153, 1)',
    borderTopWidth: 1,
  },

});