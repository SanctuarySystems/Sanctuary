import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from '@rneui/themed';
import SpacesListing from './SpacesListing';

const SpacesList = ({ currentTab, spaceArray, currentUser, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <View>
      <SearchBar
        platform="ios"
        containerStyle={{}}
        inputContainerStyle={{}}
        inputStyle={{}}
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

      <View>
        { spaceArray.length === 0 &&
          <Text style={{ position: 'relative' }}>You're not in any spaces!</Text> }
        { spaceArray.length > 0 &&
          spaceArray.map((item) => {
            const name = item.toLowerCase();
            const search = searchTerm.toLowerCase();
            if (searchTerm.length !== 0 && name.indexOf(search) < 0) return;

            return (
              <View style={{ padding: 10 }}>
                <SpacesListing currentTab={currentTab} space={item} currentUser={currentUser} navigation={navigation} />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default SpacesList;