import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, SearchBar } from '@rneui/themed';
import axios from "axios";
import SpacesList from "./SpacesList.jsx";

const Search = ({ navigation }) => {
  const [allSpaces, setAllSpaces] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces`)
      .then((data) => {
        setAllSpaces(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredSpaces = allSpaces.filter((space) => {
    return space.space_name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <SearchBar
        platform="ios"
        containerStyle={{}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        loadingProps={{}}
        onChangeText={(newVal) => setQuery(newVal)}
        onClearText={() => setQuery('')}
        placeholder="Search Spaces..."
        placeholderTextColor="#888"
        showCancel
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => console.log('cancelling')}
        value={query}
      />
      {filteredSpaces.length !== 0 &&
        <SpacesList filteredSpaces={filteredSpaces} navigation={navigation} />
      }
      <Button
        buttonStyle={{
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 350,
          marginVertical: 10,
        }}
        title="CREATE ROOM +"
        onPress={() => navigation.navigate('Spaces Form')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Search;