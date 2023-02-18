import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { colorTheme } from './colorTheme';
import { UsernameContext, apiUrl } from '../../App.js';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('reported', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const NotificationListing = (props) => {
  const {
    username,
    reported,
    reportedBy,
    spaceName,
    commentId,
    confessionId,
    navigation,
    reportedCookie,
  } = props;

  const [isReported, setIsReported] = React.useState(false);
  const { userToken } = useContext(UsernameContext);
  const name = reported === username ? 'Your' : `${reported}'s`;
  const post = commentId ? 'comment' : 'confession';


  console.log(commentId, confessionId);

  const [fontsLoaded] = useFonts({
    FuzzyBubblesRegular: require('../../assets/fonts/FuzzyBubbles-Regular.ttf'),
    FuzzyBubblesBold: require('../../assets/fonts/FuzzyBubbles-Bold.ttf'),
  });

  React.useEffect(() => {
    markRead(confessionId, commentId, userToken);
  }, []);

  const handleBan = () => {
    setIsReported(true);

    axios.patch(`${apiUrl}/spaces/${spaceName}/${reported}/ban`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then(() => {
        const temporaryCookie = reportedCookie ? reportedCookie.slice() : [];
        temporaryCookie.push({
          reportedUser: reported,
          confessionId,
          commentId,
        });
        storeData(temporaryCookie);
      })
      .catch((err) => console.log('ban endpoint error in profile', err));
  };

  if (!fontsLoaded) return;

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.copyContainer}>
        <Text style={styles.copyBold}>{name} </Text>
        <Text style={styles.copy}>{post} in the </Text>
        <Text style={styles.copyBold}>{spaceName} </Text>
        <Text style={styles.copy}>space has been reported by </Text>
        <Text style={styles.copyBold}>{reportedBy}.</Text>
      </View>

      <View style={styles.buttonView}>
        <View style={styles.buttonContainer}>
          { reported !== username
            && (
              <Button
                size="sm"
                buttonStyle={isReported? styles.buttonInactive : styles.button}
                title={isReported ? "User banned" : "Ban reported"}
                titleStyle={styles.buttonText}
                onPress={() => console.log('Banning reported') || handleBan()}
              />
            )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size="sm"
            buttonStyle={isReported? styles.buttonInactive : styles.button}
            title={`View ${post}`}
            titleStyle={styles.buttonText}
            titleStyle={styles.buttonText}
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

const styles = StyleSheet.create({
  notificationContainer: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: colorTheme.orange,
    marginBottom: 15,
  },
  copyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  copyBold: {
    color: colorTheme.beige,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "FuzzyBubblesBold",
  },
  copy: {
    fontSize: 16,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flex: 1,
    alignContent: 'center',
    padding: 5,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colorTheme.blue,
    padding: 8,
  },
  buttonInactive: {
    borderRadius: 10,
    backgroundColor: `gray`,
    padding: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

const markRead = (confessionId, commentId, userToken) => {
  if (commentId) {
    axios.patch(`${apiUrl}/confessions/${confessionId}/${commentId}/reported_read`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .catch((err) => console.log('mark comment read error in profile', err));
  } else {
    axios.patch(`${apiUrl}/confessions/${confessionId}/reported_read`, {}, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .catch((err) => console.log('mark confession read error in profile', err));
  }
};

export default NotificationListing;