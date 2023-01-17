import React from "react";
import axios from "axios";
import { Button, Text, View } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Page</Text>
      <Button
        title="Go to Test Page"
        onPress={() => navigation.navigate('Test Page')}
      />
    </View>
  );
};

export default Home;
