import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

const Space = () => {
  const [tab, setTab] = React.useState(0);
  const [leavejoin, setLeaveJoin] = React.useState(0);

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5, backgroundColor: 'pink' }} />
      <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{fontSize: '20%'}}>Space Name</Text>
          <Text>## Users</Text>
        </View>
        {leavejoin===1 &&<Button title="depart" onPress={() => {setLeaveJoin(0)}}/>}
        {leavejoin===0 &&<Button title="join" onPress={() => {setLeaveJoin(1)}}/>}
      </View>
      <View style={{flex: 0.5}} >
        <Text>space description. space description. space description. space description. </Text>
      </View>
      <View style={{flex: 0.4, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text style={[tab === 0? styles.selectedTab: styles.unselectedTab]} onPress={() => {setTab(0)}}>FEED</Text>
        <Text style={[tab === 1? styles.selectedTab: styles.unselectedTab]}onPress={() => {setTab(1)}}>GUIDELINES</Text>
      </View>
      {tab === 0 && <View style={{ flex: 8, backgroundColor: 'red' }} />}
      {tab === 1 && <View style={{ flex: 8, backgroundColor: 'pink' }} />}
      <View style={{flex: 0.5, paddingBottom:'4%'}}>
        <Button title='write'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  selectedTab: {
    fontSize:'18%',
    textDecorationLine: 'underline'
  },
  unselectedTab: {
    fontSize:'18%'
  }
});

export default Space;