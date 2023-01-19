import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('reported', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const NotificationListing = ({ reported, reportedBy, spaceName, commentId, confessionId, navigation, reportedCookie, unreadNotifs, setUnreadNofits }) => {
  const [isReported, setIsReported] = React.useState(false);

  const handleBan = () => {
    setIsReported(true);

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
        <Button
          buttonStyle={{ borderRadius: 30 }}
          title={isReported ? "User Banned" : "Ban Reporter"}
          type="outline"
          onPress={() => console.log('Banning reporter') || handleBan()}
        />
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