import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const SpaceEntry = ({ navigation, space }) => {
  return (
    <View style={styles.container}>
      <Button
        title={space.space_name}
        onPress={() => navigation.navigate('Test Page', {
          space_name: space.space_name,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'cener',
  },
});

export default SpaceEntry;