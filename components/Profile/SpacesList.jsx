import React from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from '@rneui/themed';
import SpacesListing from './SpacesListing';

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
// });

const SpacesList = ({ currentTab, spaceData, currentUser, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const renderItem = ({ item }) => {
    const name = item.toLowerCase();
    const search = searchTerm.toLowerCase();

    if (searchTerm.length !== 0 && name.indexOf(search) < 0) return;
    // if (currentTab === 'created' && !item.admin) return;

    return (
      <View style={{ padding: 10 }}>
        <SpacesListing currentTab={currentTab} space={item} currentUser={currentUser} navigation={navigation} />
      </View>
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