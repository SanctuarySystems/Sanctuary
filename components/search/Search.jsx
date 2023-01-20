import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Button, SearchBar } from '@rneui/themed';
import axios from "axios";
import SpacesList from "./SpacesList.jsx";

const Search = ({ navigation }) => {
  const [allSpaces, setAllSpaces] = useState([]);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces?count=20`)
      .then((data) => {
        setAllSpaces(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshing]);

  const filteredSpaces = allSpaces.filter((space) => {
    return space.space_name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <ScrollView contentContainerStyle={styles.container}
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SearchBar
        platform="ios"
        containerStyle={{ backgroundColor: '#FEF1E6' }}
        inputContainerStyle={{ backgroundColor: '#F9D5A7' }}
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
          borderRadius: 30,
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF1E6',
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: 300,
  },
});

export default Search;