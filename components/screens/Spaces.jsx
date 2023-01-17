import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Rooms = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => navigation.navigate('Space')}>Rooms</Text>
    </View>
  );
};

export default Rooms;