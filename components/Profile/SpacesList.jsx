import React from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import SpacesListing from './SpacesListing';

const mockSpaceData = [
  {
    id: 1,
    name: 'outerspace',
    member_count: 180,
    admin: true,
  },
  {
    id: 2,
    name: 'earth',
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

const SpacesList = ({ currentTab }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const renderItem = ({ item }) => {
    const name = item.name.toLowerCase();
    const search = searchTerm.toLowerCase();

    if (searchTerm.length !== 0 && name.indexOf(search) < 0) return;
    if (currentTab === 'created' && !item.admin) return;

    return (
      <SpacesListing space={item} />
    );
  };

  return (
    <View>
      {/* SEARCH */}
      <TextInput
        style={styles.input}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Search..."
        keyboardType="web-search"
      />

      <FlatList
        data={mockSpaceData}
        renderItem={renderItem}
        keyExtractor={(space) => space.id}
      />
    </View>
  );
};

export default SpacesList;