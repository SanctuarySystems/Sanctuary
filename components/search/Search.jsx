import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Button, SearchBar } from '@rneui/themed';
import axios from "axios";
import SpacesList from "./SpacesList.jsx";
import { useIsFocused } from '@react-navigation/native';
import { UsernameContext, apiUrl } from '../../App.js';

const Search = ({ navigation }) => {
  const [allSpaces, setAllSpaces] = useState([]);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const { userToken } = React.useContext(UsernameContext);

  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/spaces?count=200`)
      .then((data) => {
        setAllSpaces(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshing, isFocused]);

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
      {filteredSpaces.length !== 0
        && <SpacesList filteredSpaces={filteredSpaces} navigation={navigation} />}
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