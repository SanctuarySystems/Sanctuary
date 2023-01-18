import React, { useState, useEffect, useMemo } from "react";
import { Button, Text, StyleSheet, View, TextInput } from "react-native";
// import { SearchBar } from '@rneui/themed';
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

  const updateSearch = (search) => {
    setQuery(search);
  };

  const filteredSpaces = allSpaces.filter((space) => {
    return space.space_name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Spaces..."
        onChangeText={updateSearch}
        value={query}
      />
      {filteredSpaces.length !== 0 &&
        <SpacesList filteredSpaces={filteredSpaces} navigation={navigation}/>
      }
      <Button
        title="CREATE ROOM"
        onPress={() => navigation.navigate('Spaces Form')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Search;