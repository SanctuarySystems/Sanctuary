import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('reported', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const NotificationListing = ({ username, reported, reportedBy, spaceName, commentId, confessionId,
  navigation, reportedCookie, notifsCount, setNotifsCount, viewedCookieCount, setViewedCookieCount }) => {
  const [isReported, setIsReported] = React.useState(false);
  const name = reported === username ? 'Your' : username + "'s";
  const post = commentId ? 'comment' : 'confession';

  const [fontsLoaded] = useFonts({
    FuzzyBubblesRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBubblesBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  const handleBan = () => {
    setIsReported(true);

    axios.patch(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/spaces/${spaceName}/${reported}/ban`)
      .then(() => {
        let temporaryCookie = reportedCookie ? reportedCookie.slice() : [];
        temporaryCookie.push({
          reportedUser: reported,
          confessionId: confessionId,
          commentId: commentId,
        });
        storeData(temporaryCookie);
      })
      .catch((err) => console.log('axios error in profile', err));
  };

  if (!fontsLoaded || !notifsCount) return;

  return (
    <View style={{ borderRadius: 15, padding: 10, backgroundColor: `${colorTheme.orange}` }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
        <Text style={{ color: `${colorTheme.beige}`, fontSize: 16, fontWeight: 'bold', fontFamily: "FuzzyBubblesBold" }}>{name} </Text>
        <Text style={{ fontSize: 16 }}>{post} in the </Text>
        <Text style={{ color: `${colorTheme.beige}`, fontSize: 16, fontWeight: 'bold', fontFamily: "FuzzyBubblesBold" }}>{spaceName} </Text>
        <Text style={{ fontSize: 16 }}>space has been reported by </Text>
        <Text style={{ color: `${colorTheme.beige}`, fontSize: 16, fontWeight: 'bold', fontFamily: "FuzzyBubblesBold" }}>{reportedBy}.</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
        <View style={{ flex: 1, alignContent: 'center', padding: 5 }} >
          { reported !== username &&
            <Button
            size="sm"
            buttonStyle={{ borderRadius: 10, backgroundColor: `${colorTheme.blue}`, padding: 8 }}
            title={isReported ? "User banned" : "Ban reported"}
            titleStyle={{ fontWeight: 'bold', fontSize: 15 }}
            onPress={() => console.log('Banning reported') || handleBan()}
            />
          }
        </View>
        <View style={{ flex: 1, alignContent: 'center', padding: 5 }} >
          <Button
            size="sm"
            buttonStyle={{ borderRadius: 10, backgroundColor: `${colorTheme.blue}`, padding: 8 }}
            title={`View ${post}`}
            titleStyle={{ fontWeight: 'bold', fontSize: 15 }}
            onPress={() => navigation.navigate('Comments', {
              confession_id: confessionId,
              comment_id: commentId,
            })}
          />
        </View>
      </View>
    </View>
  );
};

const colorTheme = {
  beige: '#FEF1E6',
  yellow: '#F9D5A7',
  orange: '#FFB085',
  blue: '#90AACB',
};

export default NotificationListing;