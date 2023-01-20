import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import { UsernameContext } from "../../App";

const SpaceEntry = ({ navigation, space }) => {
  const { username } = useContext(UsernameContext);
  return (
    <View>
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.title}
        containerStyle={styles.container}
        title={space.space_name}
        onPress={() => navigation.navigate('My Space', {
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
    marginHorizontal: 50,
    height: 50,
    width: 300,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFB085',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    color: 'black',
  },
});

export default SpaceEntry;