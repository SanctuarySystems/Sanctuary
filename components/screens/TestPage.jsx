import React from "react";
import { Button, Text, View } from "react-native";
import ConfessionList from '../Confession/ConfessionList.js';
import SelectIconScreen from '../Manage/SelectIconScreen.jsx';

const TestPage = ({ navigation }) => {
  return (

    //<SelectIconScreen />
     <ConfessionList nav={navigation} allConfessions={[]}/>

    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
    //   <Text>This is a test page</Text>
    //   <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    //   <Button title="Go back" onPress={() => navigation.goBack()} />
    //   <Button
    //     title="Go back to first screen in stack"
    //     onPress={() => navigation.popToTop()}
    //   />
    // </View>

  );
};

export default TestPage;