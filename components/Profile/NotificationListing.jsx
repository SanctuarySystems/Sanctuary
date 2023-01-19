import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('reported', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const NotificationListing = ({ username, reported, reportedBy, spaceName, commentId, confessionId, navigation, reportedCookie, unreadNotifs, setUnreadNofits }) => {
  const [isReported, setIsReported] = React.useState(false);

  const handleBan = () => {
    setIsReported(true);

    axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/users/${mockData.username}`)
      .then(({ data }) => {
        setUserData(data);
        setSpaceData(data.spaces_joined);
        setCreated(data.spaces_created);
      })
      .catch((err) => console.log('axios error in profile', err));

    let temporaryCookie = reportedCookie ? reportedCookie.slice() : [];
    temporaryCookie.push({
      reportedUser: reported,
      confessionId: confessionId,
      commentId: commentId,
    });
    storeData(temporaryCookie);

    setUnreadNofits(unreadNotifs - 1);
  };

  if (!unreadNotifs) return;

  return (
    <View style={{ borderWidth: 1, borderRadius: 15, padding: 10 }}>
      <Text>
        {reported}'s comment in {spaceName} has been reported by {reportedBy}.
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-evenly' }}>
        { reported !== username &&
          <Button
          buttonStyle={{ borderRadius: 30 }}
          title={isReported ? "User Banned" : "Ban Reported"}
          type="outline"
          onPress={() => console.log('Banning reported') || handleBan()}
          />
        }
        <Button
          buttonStyle={{ borderRadius: 30 }}
          title="View Post"
          onPress={() => navigation.navigate('Comments', {
            confession_id: confessionId,
            comment_id: commentId,
          })}
        />
      </View>
    </View>
  );
};

export default NotificationListing;