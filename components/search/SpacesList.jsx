import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SpaceEntry from './SpaceEntry';

const SpacesList = ({ navigation, filteredSpaces }) => {
  return (
    <View>
      {filteredSpaces.map((space) => {
        return <SpaceEntry key={space.space_name} space={space} navigation={navigation} />;
      })}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default SpacesList;