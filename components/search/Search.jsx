import React from "react";
import { Button, Text, Stylesheet, View } from "react-native";
import axios from "axios";

const Search = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Page</Text>
      <Button
        title="Go to Test Page"
        onPress={() => navigation.navigate('Test Page')}
      />
      <Button
        title="CREATE ROOM"
        onPress={() => navigation.navigate('Spaces Form')}
      />
    </View>
  );
};

export default Search;