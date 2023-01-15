import React from 'react';
import { Button, StyleSheet, Text, View, StatusBar } from 'react-native';
import SpacesList from './SpacesList';

const mockData = {
  username: 'anon',
  avatar: 'url',
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'column',
  },
  container: {
    marginTop: StatusBar.currentHeight || 0,
    padding: 20,
    height: '100%',
  },
  align_right: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

const Profile = () => {
  const [currentTab, setCurrentTab] = React.useState('joined'); // joined, created

  return (
    <View styles={styles.profile}>
      <View styles={styles.container}>
        <View>
          {/* LOG OUT BUTTON */}
          <Button
            styles={styles.align_right}
            title="Log out"
            onPress={() => console.log('Logged Out')}
          />

          {/* NOTIFICATIONS */}

          {/* AVATAR */}
          <Text>avatar img</Text>
          {/* EDIT AVATAR */}
          <Button
            title="Edit"
            onPress={() => console.log('editing avatar')}
          />
          {/* USERNAME */}
          <Text>{mockData.username}</Text>
        </View>

        {/* TABS */}
        <View styles={styles.tabs}>
          <Button
            title="Joined Spaces"
            onPress={() => console.log('showing joined') || setCurrentTab('joined')}
          />
          <Button
            title="Created Spaces"
            onPress={() => console.log('showing created') || setCurrentTab('created')}
          />
        </View>
      </View>

      {/* SPACES */}
      <SpacesList currentTab={currentTab} />
    </View>
  );
};

export default Profile;