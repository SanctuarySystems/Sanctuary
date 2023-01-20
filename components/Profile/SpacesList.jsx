import React from 'react';
import { View, Text } from 'react-native';
import SpacesListing from './SpacesListing';

const SpacesList = ({ colorTheme, searchTerm, currentTab, spaceArray, currentUser, navigation }) => {
  if (!spaceArray) return;
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View>
        { spaceArray.length === 0 &&
          <Text style={{ alignSelf: 'center', padding: 50 }}>You are not in any spaces!</Text> }
        { spaceArray.length > 0 &&
          spaceArray.map((item) => {
            const name = item.toLowerCase();
            const search = searchTerm.toLowerCase();
            if (searchTerm.length !== 0 && name.indexOf(search) < 0) return;

            return (
              <View style={{ padding: 10 }}>
                <SpacesListing
                  key={item}
                  colorTheme={colorTheme}
                  currentTab={currentTab}
                  space={item}
                  currentUser={currentUser}
                  navigation={navigation}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default SpacesList;