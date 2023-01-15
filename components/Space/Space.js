import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

const Space = () => {
  const [tab, setTab] = React.useState(0);

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5, backgroundColor: 'pink' }} />
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text>SPACE NAME</Text>
          <Text>## Users</Text>
        </View>
        <Button title="depart" />
      </View>
      <View style={{flex: 1}} >
        <Text>space description. space description. space description. space description. </Text>
      </View>
      <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text onPress={() => {setTab[0]}}>FEED</Text>
        <Text onPress={() => {setTab[1]}}>GUIDELINES</Text>
      </View>
      {tab === 0 && <View style={{ flex: 8, backgroundColor: 'red' }} />}
      {tab === 1 && <View style={{ flex: 8, backgroundColor: 'pink' }} />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  space_name: {

  }
});

export default Space;