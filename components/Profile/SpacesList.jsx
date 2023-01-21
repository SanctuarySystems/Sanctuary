import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colorTheme } from './colorTheme';
import SpacesListing from './SpacesListing';

const SpacesList = ({ searchTerm, currentTab, spaceArray, currentUser, navigation }) => {
  if (!spaceArray) return;

  return (
    <View style={styles.listView}>
      <View style={styles.listContainer}>
        { spaceArray.length === 0
          && (
            <Text style={styles.emptyState}>
              You have not {currentTab} any spaces!
            </Text>
          )}
        { spaceArray.length > 0
          && spaceArray.map((item) => {
            const name = item.toLowerCase();
            const search = searchTerm.toLowerCase();
            if (searchTerm.length !== 0 && name.indexOf(search) < 0) return;

            return (
              <View style={styles.listingContainer}>
                <SpacesListing
                  key={item}
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

const styles = StyleSheet.create({
  listView: {
    backgroundColor: `${colorTheme.beige}`,
    height: '100%',
  },
  listContainer: {
    height: '100%',
  },
  emptyState: {
    alignSelf: 'center',
    padding: 50,
  },
  listingContainer: {
    padding: 10,
  },
});

export default SpacesList;