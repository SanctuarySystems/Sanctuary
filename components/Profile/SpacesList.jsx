import React from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import SpacesListing from './SpacesListing';
import { SearchBar } from '@rneui/themed';

const mockSpaceData = [
  {
    space_name: 'outerspace',
    createdAt: "2023-01-17T00:46:30.433Z",
    member_count: 180,
    admin: true,
  },
  {
    space_name: 'earth',
    member_count: 1,
    admin: false,
  },
];

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const SpacesList = ({ currentTab, spaceData, currentUser }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const renderItem = ({ item }) => {
    console.log('space', item);
    const name = item.toLowerCase();
    const search = searchTerm.toLowerCase();

    if (searchTerm.length !== 0 && name.indexOf(search) < 0) return;
    // if (currentTab === 'created' && !item.admin) return;

    return (
      <SpacesListing space={item} currentUser={currentUser} />
    );
  };

  return (
    <View>
      {/* SEARCH */}
      {/* <TextInput
        style={styles.input}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Search..."
        keyboardType="web-search"
      /> */}

      <SearchBar
        platform="ios"
        containerStyle={{}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        loadingProps={{}}
        onChangeText={(newVal) => setSearchTerm(newVal)}
        onClearText={() => setSearchTerm('')}
        placeholder="Search..."
        placeholderTextColor="#888"
        showCancel
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => console.log('cancelling')}
        value={searchTerm}
      />

      <FlatList
        data={spaceData}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default SpacesList;