import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import { UsernameContext } from "../../App";

const SpaceEntry = ({ navigation, space }) => {
  const username = useContext(UsernameContext);
  return (
    <View>
      <Button
        buttonStyle={{
          backgroundColor: 'rgba(111, 202, 186, 1)',
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 300,
          marginVertical: 10,
        }}
        title={space.space_name}
        onPress={() => navigation.navigate('Space1', {
          space_name: space.space_name,
          admin: true,
          username,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 30,
  },
});

export default SpaceEntry;